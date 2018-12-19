import Head from 'next/head'
import { Component } from 'react'
import Container from 'react-line-between'
import List from '../components/List'


export default class Index extends Component {
  state = {
    lines: {},
    selected: null,
  }

  render() {
    return (<Container lines={this.state.lines}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/static/snap.svg-min.js"></script>
      </Head>

      <h1>react-line-between</h1>
      <p>this does not need position absolute, and auto update when rerender, with build-in animation</p>
      <p>add some label on both sides, click on label to draw lines, remove some label to see how lines follow</p>
      <div style={{ display: 'flex' }}>
        <div style={{
          margin: '10px',
          padding: '10px',
          border: '1px solid black',
        }}>
          <h2>left</h2>
          <List
            ref={l => this.left = l}
            select={(k, n) => this.select('left', k, n)}
            remove={(k, n) => this.removeValue('left', k)}
          />
        </div>
        <div style={{
          margin: '10px',
          padding: '10px',
          border: '1px solid black',
        }}>
          <h2>right</h2>
          <List
            ref={l => this.right = l}
            select={(k, n) => this.select('right', k, n)}
            remove={(k, n) => this.removeValue('right', k)}
          />
        </div>
      </div>
    </Container>)
  }

  select(side, value, node) {
    const { selected, lines } = this.state

    if (!selected) {
      //目前没有选中的
      let k1
      if (Object.keys(lines).some(k => {
        k1 = k
        return lines[k][side] === value
      })) {
        //已经连过线的，移除线条
        delete lines[k1]
        this.setState({
          lines: {
            ...lines
          }
        })
        return
      }

      //新增
      this.setState({
        selected: {
          side,
          value,
          node,
        }
      })
      this[side].setSelected(value, true)
      return
    }

    if (selected.side === side) {
      //同侧
      if (selected.value === value) {
        //取消选择
        this[side].setSelected(value, false)
        this.setState({ selected: null })
        return
      }

      //切换
      this[selected.side].setSelected(selected.value, false)
      this.setState({
        selected: {
          side,
          value,
          node,
        }
      })
      this[side].setSelected(value, true)
      return
    }

    if (selected.side !== side) {
      if (Object.keys(lines).some(k => lines[k][side] === value)) {
        //落点已经连线，不做操作
        return
      }
      //连线
      this.setState({
        lines: {
          ...lines,
          [`${selected.side}-${selected.value}|${side}-${value}`]: {
            from: selected.node,
            to: node,
            [selected.side]: selected.value,
            [side]: value,
            attrs: {
              stroke: 'blue',
              strokeWidth: 2,
            }
          }
        },
        selected: null,
      })
      this[selected.side].setSelected(selected.value, false)
    }
  }

  removeValue(side, value) {
    const { lines, selected } = this.state
    const newSelected = (selected && selected.side === side && selected.value === value) ? null : selected
    let k1
    if (Object.keys(lines).some(k => {
      k1 = k
      return lines[k][side] === value
    })) {
      delete lines[k1]
      this.setState({
        lines: {
          ...lines,
        },
        selected: newSelected,
      })
      return
    }

    this.setState({
      selected: newSelected,
    })
  }
}