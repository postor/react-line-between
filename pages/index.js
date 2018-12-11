import { Component } from 'react'
import Line from '../lib/Line'
import Container from '../lib/Container'


export default class Index extends Component {
  render() {
    return (<Container lines={[
      new Line(this.a, this.b)
    ]}>
      <div><span ref={a => this.a = a}>[line from]</span></div>
      <br /><br /><br />
      <div>[<span contentEditable>editable</span>]<span ref={b => this.b = b}>[line to]</span></div>
    </Container>)
  }
}