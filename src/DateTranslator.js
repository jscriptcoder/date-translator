import '@babel/polyfill'
import * as tf from '@tensorflow/tfjs'
import debounce from 'debounce'

import {
  maxLen,
  numSamples,
  s0, c0,
  humanVocab,
  invMachineVocab,
  numClasses,
  lenMachineVocab,
  str2int,
} from './utils'

function translate(value, model, onTranslate = noop) {
  if (value && value.length >= lenMachineVocab) {

    const source = str2int(value, maxLen)
    const onehotSource = tf.oneHot(tf.tensor1d(source, 'int32'), numClasses)
    const reshapedSource = onehotSource.reshape([numSamples].concat(onehotSource.shape))

    const prediction = model.predict([reshapedSource, s0, c0])

    const date = prediction.reduce((acc, pred) => {
      const pIdx = pred
        .reshape([lenMachineVocab])
        .argMax()
        .get()

      return acc + invMachineVocab[pIdx]
    }, '')

    onTranslate(date)
  }
}

export default async function DateTranslator(config) {

  const { input, onTranslate } = config

  if (input) {

    const model = await tf.loadModel('./tfjsmodel/model.json')

    const onInput = debounce(event => {
      const { value } = event.target
      translate(value, model, onTranslate)
    }, 500)

    input.addEventListener('input', onInput)

  }
}
