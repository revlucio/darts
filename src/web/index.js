import React from 'react'
import ReactDOM from 'react-dom'

class HelloMessage extends React.Component {
  render() {
    return <h1>HELLO REACT WORLD!</h1>
  }
}

let App = document.getElementById('app')
ReactDOM.render(<HelloMessage />, App)
