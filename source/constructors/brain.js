const Neuron = require('./neuron');
const mutate = require('../functions/mutate.js');
const getRandomNumber = require('../functions/getrandomnumber');
const getRandomLowNumber = require('../functions/getrandomlownumber');
const createStructure = require('../functions/createstructure');

var list = {};
var times = 1000000;

for (let i = 1; i < times; i++) {
  var number = getRandomLowNumber(1, 100, 0.5);
  if (typeof list[number] == 'number') {
    list[number]++;
  } else {
    list[number] = 1;
  }
}

console.log('List: ', list);

class Brain {
  constructor(inputSize, outputSize) {
    this.bindMethods(this);
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = {};
    this.layers.input = {};
    this.layers.hidden = {};
    this.layers.output = {};
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    //this.score = 0;
    this.activations = 0;
    this.mutationRate = 1;

    for (let i1 = 0; i1 < outputSize; i1++) {
      new Neuron(this, 'output');
    }
    for (let i1 = 0; i1 < getRandomLowNumber(Math.round((inputSize + outputSize) / 2), ((inputSize + outputSize) / 4)); i1++) {
      new Neuron(this, 'hidden');
    }
    for (let i1 = 0; i1 < inputSize; i1++) {
      new Neuron(this, 'input');
    }
<<<<<<< HEAD
=======

>>>>>>> 06f6c8b3a77e1c9c85f657c430cdc4a899047021
    for (let prop in this.layers.hidden) {
      this.layers.hidden[prop].test();
    }

  }
  bindMethods(self) {
    self.deleteNeuron = this.deleteNeuron.bind(self);
    self.deleteConnection = this.deleteConnection.bind(self);
    self.input = this.input.bind(self);
    self.generate = this.generate.bind(self);
    self.resetResistance = this.resetResistance.bind(self);
    self.getAllNeurons = this.getAllNeurons.bind(self);
    self.getAllConnections = this.getAllConnections.bind(self);
  }
  getAllNeurons() {
    return Object.values(this.globalReferenceNeurons);
  }
  getAllConnections() {
    return Object.values(this.globalReferenceConnections);
  }
  resetResistance() {
    this.getAllNeurons().forEach(neuron => {
      neuron.resistance = 0;
    });
  }
  input(array) {
    Object.values(this.layers.input).forEach((input, index) => {
      input.transmit(array[index]);
    });
    return Object.values(this.layers.output).map(neuron => {
      return neuron.measure();
    });
    this.resetResistance();
  }
  deleteConnection(connectionId) {
    if (this.globalReferenceConnections.hasOwnProperty(connectionId)) {
      let connection = this.globalReferenceConnections[connectionId];
      let source = connection.source;
      let target = connection.target;
      if (source.connections[connectionId]){
        delete source.connections[connectionId];
      }
      if (target.connected[connectionId]){
        delete target.connected[connectionId];
      }
      delete this.globalReferenceConnections[connectionId];
    }
  }
  deleteNeuron(neuronId) {
    if (this.globalReferenceNeurons.hasOwnProperty(neuronId)) {
      let neuron = this.globalReferenceNeurons[neuronId];
      Object.values(neuron.connections).concat(Object.values(neuron.connected)).forEach(connection => {
        connection.delete();
      });
      delete this.globalReferenceNeurons[neuronId];
    }
  }
  generate() {
    this.activations = 0;
    //console.log('Current mutation rate: ', this.mutationRate);
    //console.log('Mutation rate mutationRateGrowth: ', this.mutationRateGrowth);
    this.mutationRate = getRandomLowNumber(1, 100, 0.1); //change the max to be based on the current complexity of the network
    //console.log('New mutation rate: ', this.mutationRate);
    //console.log(this.mutationRate);
    mutate(this.mutationRate, this);
  }
}
module.exports = Brain;
