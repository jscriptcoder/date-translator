import './example.css'

import "@babel/polyfill"
import DateTranslator from './DateTranslator'

const input = document.getElementById('input-translator')
const display = document.getElementById('machine-date-display')

DateTranslator({
  input,
  onTranslate(machineDate) {
    display.textContent = machineDate
  }
})
