import '@babel/polyfill'
import debounce from 'debounce'

export default async function DateTranslator(config) {

  const { input, onTranslate } = config

  if (input) {

    const worker = new Worker('./worker.js')

    worker.onmessage = event => {
      const { data } = event
      if (data.loading) {
        console.log('Loading model')
      } else if (data.translating) {
        console.log('Translating human date')
      } else if (data.date) {
        console.log(`Machine date: ${data.date}`)
      } else {
        console.log('Model loaded')
      }
    }

    input.addEventListener('input', debounce(event => {
      const { value } = event.target
      worker.postMessage(value)
    }, 500))

  }
}
