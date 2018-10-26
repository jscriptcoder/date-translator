export const humanVocab = {
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

export function str2int(str, length, vocab) {
  str = str
    .toLowerCase()
    .replace(',','')

  if (str.length > length) {
    str = str.slice(0, length)
  }

  let intArr = str
    .split('')
    .map(char => humanVocab[char] || humanVocab['<unk>'])

  if (str.length < length) {
    intArr = intArr.concat(
      new Array(length - str.length).fill(humanVocab['<pad>'])
    )
  }

  return intArr
}
