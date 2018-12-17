import Head from 'next/head'
import { Component } from 'react'
import Container from '../lib/Container'


export default class Index extends Component {
  state = {
    lines: [],
    lis: [],
    input: '',
  }

  componentDidMount() {
    const { a, b } = this
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
      ],
    })
  }

  render() {
    const { lis, input } = this.state
    return (<Container lines={this.state.lines}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/static/snap.svg-min.js"></script>
      </Head>
      <div>
        <span ref={a => this.a = a}>[line from]</span>
        <br />
        <span>lots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of words</span>
        <span>lots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of words</span>
        <span>lots of wordslots of wordslots of wordslots of wordslots of wordslots of wordslots of words</span>
        <br />
        <ul>{lis.map((x, i) => {
          return (<li key={i}>{x}</li>)
        })}</ul>
        <input value={this.state.input} onChange={(e) => this.setState({
          input: e.target.value,
        })} /><button onClick={() => this.setState({
          lis: lis.concat(input),
          input: '',
        })}>add li</button>
        <br />
        <button onClick={() => this.setState({
          lis: lis.concat(input),
          input: '',
        })}>redraw line</button>
        <span ref={b => this.b = b}>[line to]</span></div>
    </Container>)
  }
}