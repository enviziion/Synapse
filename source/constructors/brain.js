import Neuron from './neuron.js';
import mutate from '../functions/mutate.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import createStructure from '../functions/createstructure.js';
import deepCopy from '../functions/clonedeep.js';

class Brain {
  constructor(inputSize, outputSize) {
    this.layerCount = getRandomLowNumber(3, 10, 0.5);
    console.log('Brain created with ' + this.layerCount + ' layers.', this);
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.inputLayer = {};
    this.outputLayer = {};
    this.layerSize = Math.ceil((inputSize + outputSize) / 2);
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    this.activations = 0;
    this.mutationRate = null;
    for (let layerIndex = this.layerCount; layerIndex > 0; layerIndex--) {
      if (layerIndex === 1) {
        for (let neuronIndex = 0; neuronIndex < inputSize; neuronIndex++) {
          let inputNeuron = new Neuron(this, layerIndex);
        }
      } else if (layerIndex === this.layerCount - 1) {
        for (let neuronIndex = 0; neuronIndex < outputSize; neuronIndex++) {
          new Neuron(this, layerIndex);
        }
      } else {
        for (let neuronIndex = 0; neuronIndex < this.layerSize; neuronIndex++) {
          new Neuron(this, layerIndex);
        }
      }
    }
  }
  input(array) {
    Object.values(this.inputLayer).forEach((input, index) => {
      input.transmit(array[index]);
    });
    let result = Object.values(this.outputLayer).map(neuron => {
      return neuron.measure();
    });
    //console.log('result', result)
    return result;
  }
  getLayer(index, func){
    let layer = Object.values(this.globalReferenceNeurons).filter(neuron => neuron.layer === index);
    if (func && layer.length > 0) {
      //console.log('Retreived layer', layer);
      func(layer);
      return layer;
    } else {
      return false;
    }
  }
  getComplexity(){
    let total = 0;
    total += Object.keys(this.globalReferenceNeurons).length;
    total += Object.keys(this.globalReferenceConnections).length;
    return total;
  }
  spawn(mutationRate) {
    let child = deepCopy(this);
    child.activations = 0;
    child.mutationRate = mutationRate || getRandomNumber(1, 50);
    mutate(child);
    return child;
  }
  copy(){
    let child = deepCopy(this);
    return child;
  }
}
export default Brain;
