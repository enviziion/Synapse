import Neuron from './neuron.js';
import mutate from '../functions/mutate.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import createStructure from '../functions/createstructure.js';
import deepCopy from '../functions/clonedeep.js';

class Brain {
  constructor(inputSize, outputSize) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = [];
    this.layerCount = getRandomNumber(3, 20);
    console.log('Brain created with ' + this.layerCount + ' layers.')
    this.layerSize = Math.ceil((inputSize + outputSize) / 2);
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    this.activations = 0;
    this.mutationRate = null;
    for (let layerIndex = 0; layerIndex < this.layerCount; layerIndex++) {
      this.layers.push({});
    }
    for (let layerIndex = this.layers.length; layerIndex > 0; layerIndex--) {
      if (layerIndex === 1) {
        for (let neuronIndex = 0; neuronIndex < inputSize; neuronIndex++) {
          new Neuron(this, layerIndex);
        }
        continue;
      }
      if (layerIndex === this.layerCount) {
        for (let neuronIndex = 0; neuronIndex < outputSize; neuronIndex++) {
          new Neuron(this, layerIndex);
        }
        continue;
      }
      for (let neuronIndex = 0; neuronIndex < this.layerSize; neuronIndex++) {
        new Neuron(this, layerIndex);
      }
    }
  }
  input(array) {
    //console.time('Brain input');
    Object.values(this.layers[0]).forEach((input, index) => {
      input.transmit(array[index]);
    });
    //console.log("Finished propogating input, measuring output layer.")
    //console.timeEnd('Brain input');
    return Object.values(this.layers[this.layerCount - 1]).map(neuron => {
      return neuron.measure();
    });
  }
  spawn(mutationRate) {
    //console.time('Spawn');
    let child = deepCopy(this);
    child.activations = 0;
    child.mutationRate = mutationRate || getRandomNumber(1, 300);
    mutate(child);
    //console.timeEnd('Spawn');
    return child;
  }
  copy(){
    let child = deepCopy(this);
    return child;
  }
}
export default Brain;
