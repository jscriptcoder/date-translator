import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

export default class DateTranslator extends React.Component {

  async componentDidMount() {
    this.model = await tf.loadModel('./tfjsmodel/model.json');
    console.log(this.model)
  }

  render() {
    return <div>DateTranslator</div>
  }
}
