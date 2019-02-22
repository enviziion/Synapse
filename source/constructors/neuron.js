import Connection from './connection.js';
import isNumber from '../functions/isnumber.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import getRandomDecimal from '../functions/getrandomdecimal.js';

class Neuron {
  constructor(brain, layer) {
    this.id = brain.counter;
    this.layer = layer - 1;
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceNeurons[this.id] = this;
    if (this.layer === 0) {
      this.brain.inputLayer[this.id] = this;
    } else if (this.layer === this.brain.layerCount - 1){
      this.brain.outputLayer[this.id] = this;
    }
    this.connected = {};
    this.connections = {};
    this.memory = [];
    this.chargeRate = getRandomDecimal(0.5, 4);
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
    if (this.layer < this.brain.layerCount - 1){
      let initialChildrenCount = getRandomNumber(1, 10);
      //console.log('initial children count', initialChildrenCount);
      //console.log('brain', brain);
      for (let i = 0; i < initialChildrenCount; i++) {
        let targetLayerIndex = getRandomNumber(this.layer + 1, this.brain.layerCount - 1);
        //console.log('target layer index', targetLayerIndex);
        this.brain.getLayer(targetLayerIndex, (targetLayer)=>{
          //console.log('target layer', targetLayer);
          let index = getRandomNumber(0, targetLayer.length - 1);
          //console.log('index', index);
          let child = targetLayer[index];
          //console.log('child', child)
          this.connect(child);
        });
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
    delete this.brain.globalReferenceNeurons[this.id];
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
