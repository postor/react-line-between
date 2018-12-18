# react-line-between

## usage

1. install

```
yarn add react-line-between
// or npm
npm i react-line-between --save
```

2. add snapsvg

```
<script src="https://cdn.jsdelivr.net/npm/snapsvg@0.5.1/dist/snap.svg.min.js"></script>
```

3. component code

```
import Container from 'react-line-between'
import { Component } from 'react'

class TestComponent extends Component {
  render() {
    return (<span >[line to]</span>)
  }
}

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
    return (<Container ref={svg => this.svg = svg} lines={this.state.lines} updateOnRender={false}>
      <div>
        <span ref={a => this.a = a}>[line from]</span>
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
        <button onClick={() => this.svg.updateSvg()}>redraw line</button>
        <TestComponent ref={b => this.b = b} />
      </div>
    </Container>)
  }
}

```


## use `snapsvg-cjs`

I use snapsvg as an injection rather than dependency because snapsvg does not support ssr, it uses window object in it's code

```
//require or import
import Snap from 'snapsvg-cjs'
import Container from 'react-line-between'


//as prop when render
<Container Snap={Snap}>
  //things to render
</Container>
```

## apis

```

```
