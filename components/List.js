import { Component } from 'react'

export default class List extends Component {
  state = {
    list: {},
    input: '',
  }

  lis = {}

  render() {
    const { input, list } = this.state
    const { select } = this.props
    return (<div>
      <h1>react-line-between</h1>
      <p>this does not need position absolute, and auto update when rerender</p>
      <p>add some label on both sides, click on label to draw lines, remove some label to see how lines follow</p>
      <ul>
        {Object.keys(list).map((k) => {
          return (<li
            key={k}
            ref={li => this.lis[k] = li}
            style={{
              position: 'relative',
              border: list[k] ? 'red 1px solid' : 'black 1px solid',
              margin: '10px',
            }}
          >
            <div
              onClick={() => select(k, this.lis[k])}
            >{k}</div>
            <a
              onClick={() => this.removeValue(k)}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            >X</a>
          </li>)
        })}
      </ul>
      <input value={input} onChange={(e) => this.setState({ input: e.target.value })} />
      {list[input] ? ('already exist') : (<button
        onClick={() => {
          this.setState({
            list: {
              ...this.state.list,
              [input]: false,
            },
            input: '',
          })
        }}
      >add label</button>)}
    </div>)
  }

  setSelected(key, flag = false) {
    this.setState({
      list: {
        ...this.state.list,
        [key]: flag,
      }
    })
  }

  removeValue(key) {
    const { list } = this.state
    delete list[key]
    this.setState({
      list: {
        ...list,
      }
    })
    this.props.remove(key)
  }
}