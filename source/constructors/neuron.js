import Connection from './connection.js';
import isNumber from '../functions/isnumber.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import getRandomDecimal from '../functions/getrandomdecimal.js';

function testFidelity(brain){
  brain.layers.forEach((layer)=>{
    Object.values(layer).forEach((neuron2)=>{
      let found = false;
      Object.values(brain.globalReferenceNeurons).forEach((neuron)=> {
        if (neuron2.id === neuron.id) {
          found = true;
        }
      });
      if (!found) {
        throw '!!! Failed to locate neuron in layer matrix!';
      } else {
        console.log('Located neuron.');
      }
    });
  });
}

class Neuron {
  constructor(brain, layer) {
    this.id = brain.counter;
    this.layer = layer - 1;
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceNeurons[this.id] = this;
    this.brain.layers[this.layer][this.id] = this.brain.globalReferenceNeurons[this.id];
    this.connected = {};
    this.connections = {};
    this.memory = [];
    this.chargeRate = getRandomDecimal(0.5, 2);
    this.memorySize = 1; //getRandomNumber(1, 10);
    this.threshold = getRandomDecimal(-1, 1);
    this.rigidity = getRandomDecimal(0, 1);
    this.inverse = getRandomNumber(0, 1);
    this.bias = getRandomDecimal(-1, 1);
    this.polarization = 0;
    this.reductions = 0;
    if (this.inverse === 0){
      this.inverse = -1;
    }
    var initialChildrenCount = getRandomLowNumber(1, Object.keys(this.brain.layers[this.layer]).length, 0.75);
    if (this.layer < this.brain.layers.length - 1){
      for (let i = 0; i < initialChildrenCount; i++) {
        let ahead = this.brain.layers.length - this.layer;
        let targetLayer = getRandomNumber(this.layer + 1, this.brain.layers.length - 1);
        let layer = this.brain.layers[targetLayer];
        let index = getRandomNumber(0, Object.keys(layer).length - 1);
        let key = Object.keys(layer)[index];
        let child = layer[key];
        this.connect(child);
      }
    }
  }
  connect(target) {
    new Connection(this.brain, this, target);
  };
  delete() {
    Object.values(this.connections).forEach(connection => {
      connection.delete();
    });
    Object.values(this.connected).forEach(connection => {
      connection.delete();
    });
    console.log('debug');
    console.log('neuron', this);
    console.log('layer index', this.layer);
    console.log('layers', this.brain.layers);
    console.log('id', this.id);
    console.log('layer', this.brain.layers[this.layer]);
    console.log('neuron reference', this.brain.layers[this.layer][this.id]);
    console.log('---');
    delete this.brain.layers[this.layer][this.id];
    if (Object.keys(this.brain.layers[this.layer]).length === 0) {
      console.log('Removing empty layer');
      this.brain.layers.splice(this.layer, 1);
      Object.values(this.brain.globalReferenceNeurons).forEach((neuron)=> {
        if (neuron.layer >= this.layer) {
          neuron.reductions++;
          neuron.layer--;
        }
      });
    }
    delete this.brain.globalReferenceNeurons[this.id];
    testFidelity(this.brain);
  }
  measure() {
    let total = 0;
    let average = 0;
    if (this.memory.length === 0) {
      return this.bias;
    } else if (this.memory.length === 1) {
      average = this.memory[0];
    } else if (this.memory.length > 1) {
      this.memory.forEach(result => {
        total += result;
      });
      average = total / this.memory.length;
    }
    let output = this.inverse * (((average * 100) + (this.bias * this.rigidity * 100)) / 200);
    return output;
  }
  transmit(charge) {
    //console.log("Neuron Recieved Charge:", charge)
    //if (this.layer == this.brain.layers.length - 1) {
    //  console.log("!!! Output Layer Affected !!!")
    //}
    this.polarization += charge * this.chargeRate;
    this.memory.push(charge);
    if (this.memory.length > this.memorySize) {
      this.memory.splice(0, 1);
    }
    let result = this.measure();
    //console.log("Connections", this.connections);
    //console.log("Charge Rate", this.chargeRate)
    //console.log("Threshold", this.threshold);
    //console.log("Inverse", this.inverse);
    //console.log("Polarization", this.polarization);
    if (this.threshold > 0 && this.polarization >= this.threshold || this.threshold < 0 && this.polarization <= this.threshold) {
      this.polarization = 0;
      //console.log("!!!!!")
      Object.values(this.connections).forEach(connection => {
        //console.log("Connection", connection)
        connection.activate(result);
      });
    }
  }
}
export default Neuron;
