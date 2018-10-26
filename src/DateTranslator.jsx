import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

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

function string2int(string, length, vocab) {
  string = string.toLowerCase().replace(',','')

  if (string.length > length) {
    string = string.slice(0, length)
  }

  rep = string.split('').map(char => humanVocab[char] || humanVocab['<unk>'])

  if (string.length < length) {
    rep = rep.concat(new Array(length - string.length).fill(humanVocab['<pad>']))
  }

  return rep
}

const example = '21th of August 2016'

export default class DateTranslator extends React.Component {

  async componentDidMount() {
    this.model = await tf.loadModel('./tfjsmodel/model.json');

    const m = 1
    const ns = 64
    const s0 = tf.zeros([m, n_s])
    const c0 = tf.zeros([m, n_s])
    const source = tf.tensor(string2int(example))

    console.log(this.model.predict([source, s0, c0]))
  }

  render() {
    return <div>DateTranslator</div>
  }
}
