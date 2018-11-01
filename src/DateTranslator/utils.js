import { zeros } from '@tensorflow/tfjs'

export const maxLen = 30
export const numSamples = 1
export const ns = 64

export const s0 = zeros([numSamples, ns], 'int32')
export const c0 = zeros([numSamples, ns], 'int32')

export const humanVocab = {
  ' ': 0,
  '/': 1,
  '0': 2,
  '1': 3,
  '2': 4,
  '3': 5,
  '4': 6,
  '5': 7,
  '6': 8,
  '7': 9,
  '8': 10,
  '9': 11,
  'a': 12,
  'b': 13,
  'c': 14,
  'd': 15,
  'e': 16,
  'f': 17,
  'g': 18,
  'h': 19,
  'i': 20,
  'j': 21,
  'l': 22,
  'm': 23,
  'n': 24,
  'o': 25,
  'p': 26,
  'r': 27,
  's': 28,
  't': 29,
  'u': 30,
  'v': 31,
  'w': 32,
  'y': 33,
  '<unk>': 34,
  '<pad>': 35
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
    .replace(/,/g,'')
    .replace(/\-|\./g, '-')
    .replace(' of ', ' ')
    .replace(/([0-9])(st|nd|rd|th)/g, '$1')

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
