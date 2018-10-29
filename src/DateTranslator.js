import '@babel/polyfill'
import * as tf from '@tensorflow/tfjs'
import debounce from 'debounce'

import {
  s0, c0,
  humanVocab,
  invMachineVocab,
  numClasses,
  lenMachineVocab,
} from './utils'

function translate(value, model, onTranslate = noop) {
  if (value && value.length >= lenMachineVocab) {

    const source = str2int(value, tx)
    const onehotSource = tf.oneHot(tf.tensor1d(source, 'int32'), numClasses)
    const reshapedSource = onehotSource.reshape([m].concat(onehotSource.shape))

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

    input.addEventListener('input', (event) => {
      const { value } = value
      translate(value, model, onTranslate)
    })

  }
}
