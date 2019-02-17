import Brain from './brain.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomProperty from '../functions/getrandomproperty.js';

class Synapse {
  constructor(inputSize, outputSize, runFunction, targetScore, maxIterations = 100000) {
    let speciesList = {};
    let parent = new Brain(inputSize, outputSize);
    let best;
    let failCount = 0;
    let failResetCount = 5000;
    let iteration = 0;
    let cont = true;
    let topScore = false;
    while (cont === true) {
      let child = parent.spawn();
      let score = runFunction(child);
      if (!topScore) {
        topScore = score;
      } else if (score >= targetScore) {
        console.log('!!! [' + iteration + '] Species evolved to achieve target score!', child);
        console.log('[ ' + Object.keys(child.globalReferenceNeurons).length + ' neurons | ' + Object.keys(child.globalReferenceConnections).length + ' connections | ' + child.layers.length + ' layers ]', best);
        break;
      } else if (score > topScore) {
        console.log('<><><><><><><><> [' + iteration + '] Species evolved from score ' + topScore + ' to ' + score + '! [ ' + Object.keys(child.globalReferenceNeurons).length + ' neurons | ' + Object.keys(child.globalReferenceConnections).length + ' connections | ' + child.layers.length + ' layers ]', child);
        best = child.copy();

        let normalized;

        normalized = [];
        console.log('[0, 0, 1, 1] [1, 0, 1, 1] =>', normalized)
        best.input([0, 0, 1, 1, 1, 0, 1, 1]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });


        normalized = [];
        console.log('[0, 0, 1, 1] [0, 1, 1, 1] =>', normalized)
        best.input([0, 0, 1, 1, 0, 1, 1, 1]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });


        normalized = [];
        console.log('[1, 0, 1, 1] [0, 1, 1, 0] =>', normalized)
        best.input([1, 0, 1, 1, 0, 1, 1, 0]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });


        normalized = [];
        console.log('[1, 1, 1, 1] [1, 0, 1, 1] =>', normalized)
        best.input([1, 1, 1, 1, 1, 0, 1, 1]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });


        speciesList[score] = child.copy();
        maxIterations = iteration + 100000;
        topScore = score;
        parent = child.copy();
        failCount = 0;
      } else {
        failCount++;
        if (failCount > failResetCount) {
          console.log('[ ' + score + ' | ' + topScore + ' ]');
          console.log('[' + iteration + '] Species died out from failure to adapt after ' + failCount + ' generations!');
          console.log('[ ' + Object.keys(child.globalReferenceNeurons).length + ' neurons | ' + Object.keys(child.globalReferenceConnections).length + ' connections | ' + child.layers.length + ' layers ]', best);
          failCount = 0;
          let choice = getRandomNumber(0, 1);
          if (choice == 1) {
            parent = new Brain(inputSize, outputSize);
            console.log('New species born!');
            console.log('New species:', parent.copy());
          } else {
            parent = getRandomProperty(speciesList);
            console.log('Extinct species revived!');
          }

        }
      }
      //console.log('Iteration ' + iteration + ' complete with score of ' + score + '  / ' + topScore);
      iteration++;
      if (maxIterations && iteration == maxIterations) {
        console.log('[' + iteration + '] Reached max iterations with top score of ' + topScore);

        let normalized;

        normalized= [];
        best.input([0, 0, 1, 1, 0, 0, 1, 1]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });
        console.log('[0, 0, 1, 1] [0, 0, 1, 1] =>', normalized)

        normalized= [];
        best.input([0, 0, 1, 1, 0, 0, 1, 1]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });
        console.log('[0, 0, 1, 1] [0, 0, 1, 1] =>', normalized)

        normalized= [];
        best.input([0, 0, 1, 1, 0, 0, 1, 1]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });
        console.log('[0, 0, 1, 1] [0, 0, 1, 1] =>', normalized)

        normalized= [];
        best.input([0, 0, 1, 1, 0, 0, 1, 1]).forEach((val)=> {
          if (val > 0) {
            normalized.push(1);
          } else {
            normalized.push(0);
          }
        });
        console.log('[0, 0, 1, 1] [0, 0, 1, 1] =>', normalized)


        console.log('[ ' + Object.keys(best.globalReferenceNeurons).length + ' neurons | ' + Object.keys(best.globalReferenceConnections).length + ' connections | ' + best.layers.length + ' layers ]', best);
        console.log(best.copy())
        break;
      }
    }
  }
}
export default Synapse;
