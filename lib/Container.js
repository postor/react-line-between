import { Component } from 'react'

export default class Container extends Component {

  toClean = []

  componentDidMount() {
    //容器变化
    const { svg, root } = this
    this.observeEl(root,() => {
      svg.offsetWidth = root.offsetWidth
      svg.offsetHeight = root.offsetHeight
    })
    
    //内容变化
    const {lines = []} = this.props
    lines.forEach(line=>{
      this.observeEl(line.from,updateLine)
      this.observeEl(line.to,updateLine)

      function updateLine(line){
        //TODO update line
      }
    })


  }

  observeEl(el,callback){
    const observer = new MutationObserver(callback)
    observer.observe(el)
    this.toClean.push(() => observer.disconnect)
  }

  componentWillUnmount() {
    this.toClean.forEach(x => x())
  }

  render() {

    return (<div ref={root => this.root = root}>
      <svg ref={svg => this.svg = svg}></svg>
      {this.props.children}
    </div>)
  }
}