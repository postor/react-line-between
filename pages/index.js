import Head from 'next/head'
import { Component } from 'react'
import Container from '../lib/Container'
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
      <div style={{ display: 'flex' }}>
        <List
          ref={l => this.left = l}
          select={(k, n) => this.select('left', k, n)}
          remove={(k, n) => this.removeValue('left', k)}
        />
        <List
          ref={l => this.right = l}
          select={(k, n) => this.select('right', k, n)}
          remove={(k, n) => this.removeValue('right', k)}
        />
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
          [`${selected.value}`]: {
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
    const newSelected = (selected.side === side && selected.value === value) ? null : selected
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