import getRandomProperty from './getrandomproperty.js';
import getRandomNumber from './getrandomnumber.js';
import getRandomDecimal from './getrandomdecimal.js';
import getRandomLowNumber from './getrandomlownumber.js';
import Neuron from '../constructors/neuron.js';

let mutations = {
  connect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Connecting neurons.');
        let sourceLayerIndex = getRandomNumber(0, brain.layers.length - 2);
        let sourceLayer = brain.layers[sourceLayerIndex];
        if (sourceLayer.length > 0) {
          let source = getRandomProperty(sourceLayer);
          let targetLayerIndex = getRandomNumber(sourceLayerIndex + 1, brain.layers.length - 1);
          let targetLayer = brain.layers[targetLayerIndex];
          let target = getRandomProperty(targetLayer);
          source.connect(target);
        }
    }
  },
  disconnect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Disconnecting neurons.');
      if (Object.keys(brain.globalReferenceConnections).length > 0) {
        let connection = getRandomProperty(brain.globalReferenceConnections);
        connection.delete();
      }
    }
  },
  connectionBias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Biasing connections.');
      if (Object.keys(brain.globalReferenceConnections).length > 0) {
        let connection = getRandomProperty(brain.globalReferenceConnections);
        connection.bias = getRandomDecimal(-1, 1);
      }
    }
  },
  neuronBias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Biasing connections.');
      let neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.bias = getRandomDecimal(-1, 1);
    }
  },
  connectionRigidity: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Biasing connections.');
      if (Object.keys(brain.globalReferenceConnections).length > 0) {
        let connection = getRandomProperty(brain.globalReferenceConnections);
        connection.rigidity = getRandomDecimal(0, 1);
      }
    }
  },
  neuronRigidity: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Biasing connections.');
      let neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.rigidity = getRandomDecimal(0, 1);
    }
  },
  addNeuron: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Adding neurons.');
      let layer = getRandomNumber(1, brain.layers.length - 2);
      new Neuron(brain, layer);
    }
  },
  removeNeuron: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Removing neurons.');
      let layerIndex = getRandomNumber(1, brain.layers.length - 2);
      let layer = brain.layers[layerIndex];
      if (Object.keys(layer).length > 0) {
        var neuron = getRandomProperty(layer);
        neuron.delete();
      }
    }
  },
  invert: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Filling memory.');
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.inverse = getRandomNumber(0, 1);
      if (neuron.inverse === 0) {
        neuron.inverse = -1;
      }
    }
  },
  neuronMemory: {
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {
      //console.log('Filling memory.');
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.memorySize = getRandomNumber(1, 10);;
    }
  },
  connectionMemory: {
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {
      //console.log('Filling memory.');
      var connection = getRandomProperty(brain.globalReferenceConnections);
      connection.memorySize = getRandomNumber(1, 10);;
    }
  },
  threshold: { //lower action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.threshold = getRandomDecimal(-1, 1);
    }
  },
  chargeRate: { //raise action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.chargeRate = getRandomDecimal(0, 1);
    }
  }
};
export default mutations;
