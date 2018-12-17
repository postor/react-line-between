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
      <ul>
        {Object.keys(list).map((k) => {
          return (<li
            key={k}
            ref={li => this.lis[k] = li}
            style={{
              position: 'relative',
              border: list[k] ? 'red 1px solid' : 'black 1px solid'
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
      <input value={input} onChange={(e) => this.setSelected(e.target.value)} />
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