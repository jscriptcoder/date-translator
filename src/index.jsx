import "@babel/polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import DateTranslator from './DateTranslator'

const App = props => (
  <div className="app">
    { props.children }
  </div>
)

const appNode = document.getElementById('example')

ReactDOM.render(
  <App>
    <DateTranslator />
  </App>,
  appNode
)
