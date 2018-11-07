import * as tf from '@tensorflow/tfjs'
import {
  s0, c0,
  str2int,
  numClasses,
  numSamples,
  lenMachineVocab,
  invMachineVocab,
} from './utils'

let model = null

async function translate(value, onTranslate) {
  if (value && value.length >= 6) {

    return new Promise(resolve => {
      const source = str2int(value)
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

      resolve(date)
    })

  }

  return Promise.resolve('')
}

async function loadModel() {
  postMessage({ loading: true })
  model = await tf.loadModel('./tfjsmodel/model.json')
  postMessage({ loading: false })
}

onmessage = async event => {
  const value = event.data

  postMessage({ translating: true })
  const date = await translate(value)
  postMessage({ date })
}

loadModel()
