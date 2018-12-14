import Head from 'next/head'
import { Component } from 'react'
import Container from '../lib/Container'


export default class Index extends Component {
  state = { 
    lines: [],
    lis: [] ,
  }

  componentDidMount() {
    const { a, b } = this
    console.log({
      a, b
    })
    this.setState({
      lines: [
        {
          from: a,
          to: b,
          attrs: {
            fill: "#fc0",
            stroke: "#000",
            strokeWidth: 2,
          }
        },
      ]
    })
  }

  render() {
    return (<Container lines={this.state.lines}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/static/snap.svg-min.js"></script>
      </Head>
      <div><span ref={a => this.a = a}>[line from]</span>lots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of words</div>
      <ul>{
        
      }</ul>
      <div>[<span contentEditable></span>]<span ref={b => this.b = b}>[line to]</span></div>
    </Container>)
  }
}