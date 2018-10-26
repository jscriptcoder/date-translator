import * as React from 'react'
import * as tf from '@tensorflow/tfjs'
import {
  humanVocab,
  invMachineVocab,
  str2int
} from './utils'

const tx = 30
const m = 1
const ns = 64
const s0 = tf.zeros([m, ns], 'int32')
const c0 = tf.zeros([m, ns], 'int32')
const numClasses = Object.keys(humanVocab).length
const lenMachineVocab = Object.keys(invMachineVocab).length

export default class DateTranslator extends React.Component {

  constructor(props) {
    super(props)
    this.defaultInput = props.defaultInput || ''
    this.state = { date: '' }
  }

  async componentDidMount() {
    this.model = await tf.loadModel('./tfjsmodel/model.json')
    //this.translate(this.defaultInput)
  }

  inputChange = event => {
    this.translate(event.target.value)
  }

  translate(value) {
    if (value && value.length >= lenMachineVocab) {
      const source = str2int(value, tx)
      const onehotSource = tf.oneHot(tf.tensor1d(source, 'int32'), numClasses)
      const reshapedSource = onehotSource.reshape([m].concat(source.shape))

      const prediction = this.model.predict([reshapedSource, s0, c0])

      const date = prediction.reduce((acc, pred) => {
        const pIdx = p
          .reshape([lenMachineVocab])
          .argMax()
          .get()

        return acc + invMachineVocab[pIdx]
      }, '')

      this.setState({ date })
    }
  }

  render() {
    return (
      <div className="date-translator">
        <input
          className="date-translator__input"
          type="text"
          value={this.defaultInput}
          onChange={this.inputChange} />
        <span className="date-translator__display">
          {this.date}
        </span>
      </div>
    )
  }
}
