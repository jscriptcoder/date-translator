import '@babel/polyfill'
import debounce from 'debounce'

export default async function DateTranslator(config) {

  const {
    input,
    beforeModelLoad,
    onReady,
    beforeTranslate,
    onTranslate,
  } = config

  if (input) {

    const worker = new Worker('./worker.js')

    worker.onmessage = event => {
      const { data } = event
      if (data.loading) {
        beforeModelLoad()
      } else if (data.translating) {
        beforeTranslate(input.value)
      } else if (data.date) {
        onTranslate(data.date)
      } else {
        onReady()
      }
    }

    input.addEventListener('input', debounce(event => {
      const { value } = event.target
      worker.postMessage(value)
    }, 500))

  }
}
