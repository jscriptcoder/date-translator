import './example.css'

import "@babel/polyfill"
import DateTranslator from './DateTranslator'

const input = document.getElementById('input-translator')
const display = document.getElementById('machine-date-display')

DateTranslator({
  input,
  beforeModelLoad() {
    display.textContent = 'Loading model...'
  },
  onReady() {
    display.textContent = 'Ready to translate...'
    input.focus()
  },
  beforeTranslate() {
    display.textContent = 'Translating...'
  },
  onTranslate(date) {
    display.textContent = date
  }
})
