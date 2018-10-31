import { zeros } from '@tensorflow/tfjs'

export const maxLen = 30
export const numSamples = 1
export const ns = 64

export const s0 = zeros([numSamples, ns], 'int32')
export const c0 = zeros([numSamples, ns], 'int32')

export const humanVocab = {
  ' ': 0,
  '-': 1,
  '/': 2,
  '0': 3,
  '1': 4,
  '2': 5,
  '3': 6,
  '4': 7,
  '5': 8,
  '6': 9,
  '7': 10,
  '8': 11,
  '9': 12,
  'a': 13,
  'b': 14,
  'c': 15,
  'd': 16,
  'e': 17,
  'f': 18,
  'g': 19,
  'h': 20,
  'i': 21,
  'j': 22,
  'l': 23,
  'm': 24,
  'n': 25,
  'o': 26,
  'p': 27,
  'r': 28,
  's': 29,
  't': 30,
  'u': 31,
  'v': 32,
  'w': 33,
  'y': 34,
  '<unk>': 35,
  '<pad>': 36
}

export const machineVocab = {
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

export const invMachineVocab = {
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

export const numClasses = Object.keys(humanVocab).length
export const lenMachineVocab = Object.keys(invMachineVocab).length

export function str2int(str) {
  str = str
    .toLowerCase()
    .replace(',','') // removes comas
    .replace('/', '-') // removes slashes
    .replace(' of ', ' ') // removes preposition
    .replace(/([0-9])(st|nd|rd|th)/, '$1') // removes ordinals

  console.log(`After cleaning: ${str}`)

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
