import { Component } from 'react'
import { linePoints } from './utils/position'

export default class Container extends Component {

  state = {
    svgs: {},
  }

  toClean = []

  static getDerivedStateFromProps(props, state) {
    const { svgs } = state
    const { lines } = props
    const rtn = {}
    Object.keys(svgs).forEach(k => {
      const line = lines[k]
      if (line) {
        //存在则更新或创建
        rtn[k] = {
          ...svgs[k],
          ...line,
        }
        return
      }
      //不存在的则删掉
      svgs[k].svg && svgs[k].svg.remove()
    })

    //目前还没有的加上
    Object.keys(lines).filter(k => !svgs[k]).forEach(k => {
      rtn[k] = { ...lines[k] }
    })
    return {
      svgs: rtn,
    }
  }

  componentDidMount() {
    const { svg } = this

    const Snap = this.props.Snap || window.Snap
    if (!Snap) {
      throw `react-line-between requires snapsvg, eighter make it window.Snap or use Snap as prop of Container`
    }

    this.snap = Snap(svg)
    this.updateSvg()
  }

  updateSvg() {
    if (typeof window == 'undefined') {
      return
    }

    const { svg, root, snap } = this
    if (!svg || !root || !snap) {
      return
    }

    //容器变化
    snap.attr({
      width: root.offsetWidth,
      height: root.offsetHeight,
    })

    //内容变化
    const { svgs = {} } = this.state
    Object.keys(svgs).forEach(k => {
      const line = svgs[k]
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
        const [x1, y1, x2, y2] = linePoints(line.from, line.to, root)

        const { animate = {} } = this.props
        //无动画
        if (!animate) {
          line.svg.attr({
            x1, y1, x2, y2,
          })
          return
        }

        //有动画
        const { duration = 600, easing = mina.linear, callback = () => { } } = animate
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

      line.svg = this.snap.line(...linePoints(line.from, line.to, root))
      line.svg.attr(line.attrs)
    })
  }

  render() {
    const { updateOnRender = true } = this.props
    updateOnRender && setTimeout(() => this.updateSvg())
    return (<div ref={root => this.root = root} style={{ position: 'relative' }}>
      <svg ref={svg => this.svg = svg} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: '-1',
      }}></svg>
      {this.props.children}
    </div>)
  }
}