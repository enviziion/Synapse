import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import getRandomDecimal from '../functions/getrandomdecimal.js';

class Connection {
  constructor(brain, source, target) {
    //console.log('Connecting ', source, 'to', target);
    if (!target) throw 'Connection missing target!';
    if (!source) throw 'Connection missing source!';
    if (!brain) throw 'Connection missing brain!';
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceConnections[this.brain.counter] = this;
    this.id = brain.counter;
    this.bias = getRandomDecimal(-1, 1);
    this.rigidity = getRandomDecimal(0, 1);
    this.source = source;
    this.target = target;
    this.memory = [];
    this.memorySize = 1; //getRandomLowNumber(1, 10, 0.5);
    if (source) source.connections[this.id] = this;
    if (target) target.connected[this.id] = this;

  }
  measure() {
    let total = 0;
    let average = 0;
    if (this.memory.length > 1) {
      this.memory.forEach(result => {
        total += result;
      });
      average = total / this.memory.length;
    } else {
      average = this.memory[0];
    }

    let output = ((average * 100) + (this.bias * this.rigidity * 100)) / 200;
    return output;
  }
  activate(charge) {
    //console.log("Connection Recieved Charge:", charge)
    this.memory.push(charge);
    if (this.memory.length > this.memorySize) {
      this.memory.splice(0, 1);
    }
    let result = this.measure();
    this.target.transmit(result);
  }
  delete() {
    if (this.source) delete this.source.connections[this.id];
    if (this.target) delete this.target.connected[this.id];
    delete this.brain.globalReferenceConnections[this.id];
  }
}
export default Connection;
