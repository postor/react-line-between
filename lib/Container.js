import { Component } from 'react'
import { linePoints } from './utils/position'

export default class Container extends Component {

  toClean = []

  componentDidMount() {
    const { svg } = this

    const Snap = this.props.Snap || window.Snap
    if (!Snap) {
      throw `react-line-between requires snapsvg, eighter make it window.Snap or use Snap as prop of Container`
    }

    this.snap = Snap(svg)
  }

  updateSvg() {
    if (typeof window == 'undefined') {
      return
    }

    const { svg, root } = this
    if (!svg || !root) {
      return
    }

    //容器变化
    svg.offsetWidth = root.offsetWidth
    svg.offsetHeight = root.offsetHeight


    //内容变化
    const { lines = [] } = this.props
    lines.forEach(line => {

      //已经绘制
      if (line.svg) {
        //已经失效
        if (!line.from || !line.to) {
          line.svg.remove()
          line.svg = undefined
          return
        }

        //更新属性        
        line.svg.attr(line.attrs)
        const { from, to } = line
        const [x1, y1, x2, y2] = linePoints(...linePoints(from, to, root))

        const { animate = {} } = this.props
        //无动画
        if (!animate) {
          line.svg.attr({
            x1, y1, x2, y2,
          })
          return
        }

        //有动画
        const { duration, easing, callback } = animate
        line.svg.animate({
          x1, y1, x2, y2,
        }, duration, easing, callback)
        return
      }

      //未绘制且无效
      if (!line.from || !line.to) {
        return
      }


      //重新绘制
      const { from, to, attrs } = line
      line.svg = this.snap.line(...linePoints(from, to, root))
      line.svg.attr(attrs)
    })
  }

  observeEl(el, callback) {
    const observer = new MutationObserver(callback)
    observer.observe(el, {
      childList: true,
      attributes: true,
      subtree: true
    })
    this.toClean.push(() => observer.disconnect())
  }

  componentWillUnmount() {
    this.toClean.forEach(x => x())
  }

  render() {
    this.updateSvg()
    return (<div ref={root => this.root = root}>
      <svg ref={svg => this.svg = svg} style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}></svg>
      {this.props.children}
    </div>)
  }
}