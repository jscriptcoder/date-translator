import * as tf from '@tensorflow/tfjs'

let model = null

const maxLen = 30
const numSamples = 1
const ns = 64

const s0 = tf.zeros([numSamples, ns], 'int32')
const c0 = tf.zeros([numSamples, ns], 'int32')

const humanVocab = {
  ' ': 0,
  '-': 1,
  '.': 2,
  '/': 3,
  '0': 4,
  '1': 5,
  '2': 6,
  '3': 7,
  '4': 8,
  '5': 9,
  '6': 10,
  '7': 11,
  '8': 12,
  '9': 13,
  'a': 14,
  'b': 15,
  'c': 16,
  'd': 17,
  'e': 18,
  'f': 19,
  'g': 20,
  'h': 21,
  'i': 22,
  'j': 23,
  'l': 24,
  'm': 25,
  'n': 26,
  'o': 27,
  'p': 28,
  'r': 29,
  's': 30,
  't': 31,
  'u': 32,
  'v': 33,
  'w': 34,
  'y': 35,
  '<unk>': 36,
  '<pad>': 37
}

const machineVocab = {
  '-': 0,
  '0': 1,
  '1': 2,
  '2': 3,
  '3': 4,
  '4': 5,
  '5': 6,
  '6': 7,
  '7': 8,
  '8': 9,
  '9': 10
}

const invMachineVocab = {
  0: '-',
  1: '0',
  2: '1',
  3: '2',
  4: '3',
  5: '4',
  6: '5',
  7: '6',
  8: '7',
  9: '8',
  10: '9'
}

const numClasses = Object.keys(humanVocab).length
const lenMachineVocab = Object.keys(invMachineVocab).length

function str2int(str, vocab) {
  str = str
    .toLowerCase()
    .replace(',','')

  if (str.length > maxLen) {
    str = str.slice(0, maxLen)
  }

  let intArr = str
    .split('')
    .map(char => {
      let idx = humanVocab[char]
      if (typeof idx === 'undefined') {
        idx = humanVocab['<unk>']
      }
      return idx
    })

  if (str.length < maxLen) {
    intArr = intArr.concat(
      new Array(maxLen - str.length).fill(humanVocab['<pad>'])
    )
  }

  return intArr
}

async function translate(value, onTranslate) {
  if (value && value.length >= 8) {

    return new Promise(resolve => {
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
