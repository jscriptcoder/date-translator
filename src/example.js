import './example.css'

import "@babel/polyfill"
import DateTranslator from './DateTranslator'

const input = document.getElementById('input-translator')
const display = document.getElementById('machine-date-display')

DateTranslator({
  input,
  beforeModelLoad() {
    display.textContent = 'Loading model'
  },
  onModelLoad() {
    display.textContent = 'Model loaded'
  },
  beforeTranslate() {
    display.textContent = 'Translating...'
  },
  onTranslate(date) {
    display.textContent = date
  }
})
