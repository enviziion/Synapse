import Brain from './brain.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomProperty from '../functions/getrandomproperty.js';

class Synapse {
  constructor(settings){
    this.settings = settings;
  }
  train(runFunction) {
    let settings = this.settings;
    let inputSize = settings.inputSize;
    let outputSize = settings.outputSize;
    let targetScore = settings.targetScore;
    let maxIterations = settings.maxIterations || 100000;
    let targetComplexity = settings.targetComplexity || false;
    let speciesList = {};
    let speciesListSimplified = {};
    let parent = new Brain(inputSize, outputSize);
    console.log('brain', parent.copy().getComplexity());
    let best = parent;
    let failCount = 0;
    let failResetCount = 500;
    let iteration = 0;
    let cont = true;
    let topScore = false;
    let finalBrain;
    let simplifying = false;
    let simplifyingRelapse = false;
    let complexity;
    console.log('Training Synapse...');
    console.log('Input Size', inputSize);
    console.log('Output Size', outputSize);
    console.log('Target Score', targetScore);
    console.log('Max Iterations', maxIterations);
    console.log('Complexity Target', targetComplexity);
    while (cont === true) {
      if (simplifying && !simplifyingRelapse) {
        let child = finalBrain.spawn();
        let score = runFunction(child.copy());
        let newComplexity = child.getComplexity();
        if (score >= targetScore && complexity <= targetComplexity) {
          let finalComplexity = finalBrain.getComplexity();
          console.log('!!! Reached complexity goal of ' + finalComplexity + ' and score of ' + score);
          console.log('Final Brain', finalBrain.copy());
          this.brain = finalBrain.copy();
          let input = [];
          for (let i = 0; i < finalBrain.inputSize; i++) input.push[0];
          let start = performance.now();
          finalBrain.input(input);
          let end = performance.now();
          let duration = end - start;
          console.log('Network Runtime', duration + 'ms');
          break;
        } else if (score >= targetScore && newComplexity < complexity) {
          console.log('!!! Reduced complexity from ' + complexity + ' to ' + newComplexity + ' and score from ' + topScore + ' to ' + score);
          failCount = 0;
          finalBrain = child.copy();
          complexity = finalBrain.getComplexity();
          topScore = score;
        } else if (failCount > failResetCount) {
          speciesListSimplified[finalBrain.id] = finalBrain.copy();
          simplifyingRelapse = true;
          failCount = 0;
        } else {
          failCount++;
        }
      } else {
        let choice = getRandomNumber(0, 1);
        let child;
        if (simplifyingRelapse && choice === 1) {
          let recycledSpecies = getRandomProperty(speciesListSimplified);
          child = recycledSpecies.spawn();
        } else {
          child = parent.spawn();
        }
        let score = runFunction(child);
        if (!topScore) {
          topScore = score;
        }
        if (score >= targetScore) {
          if (simplifying) {
            simplifyingRelapse = false;
          }
          console.log('!!! [' + iteration + '] Species evolved to achieve target score!', child);
          console.log('[ ' + Object.keys(child.globalReferenceNeurons).length + ' neurons | ' + Object.keys(child.globalReferenceConnections).length + ' connections ]', best);
          finalBrain = child.copy();
          complexity = finalBrain.getComplexity();
          let input = [];
          for (let i = 0; i < finalBrain.inputSize; i++) input.push[0];
          let start = performance.now();
          finalBrain.copy().input(input);
          let end = performance.now();
          let duration = end - start;
          console.log('Network Runtime', duration + 'ms');
          if (targetComplexity) {
            failCount = 0;
            simplifying = true;
            continue;
          } else {
            break;
          }
        } else if (score > topScore) {
          console.log('<><><><><><><><> [' + iteration + '] Species evolved from score ' + topScore + ' to ' + score + '! [ ' + Object.keys(child.globalReferenceNeurons).length + ' neurons | ' + Object.keys(child.globalReferenceConnections).length + ' connections ]', child);
          best = child.copy();
          speciesList[score] = child.copy();
          maxIterations = iteration + 100000;
          topScore = score;
          parent = child.copy();
          console.log('parent test', parent);
          failCount = 0;
        } else {
          failCount++;
          if (failCount > failResetCount) {
            console.log('[ ' + score + ' | ' + topScore + ' ]');
            console.log('[' + iteration + '] Species died out from failure to adapt after ' + failCount + ' generations!');
            console.log('[ ' + Object.keys(child.globalReferenceNeurons).length + ' neurons | ' + Object.keys(child.globalReferenceConnections).length + ' connections]', best);
            failCount = 0;
            let choice = getRandomNumber(0, 1);
            if (Object.values(speciesList).length == 0) choice = 1;
            if (choice == 1) {
              parent = new Brain(inputSize, outputSize);
              console.log('parent test', parent);
              console.log('New species born!');
              console.log('New species:', parent.copy());
            } else {
              parent = getRandomProperty(speciesList);
              console.log('parent test', parent);
              console.log('Extinct species revived!');
            }
          }
        }
        //console.log('Iteration ' + iteration + ' complete with score of ' + score + '  / ' + topScore);
        iteration++;
        if (maxIterations && iteration == maxIterations) {
          console.log('[' + iteration + '] Reached max iterations with top score of ' + topScore);
          console.log('[ ' + Object.keys(best.globalReferenceNeurons).length + ' neurons | ' + Object.keys(best.globalReferenceConnections).length + ' connections | ' + best.layers.length + ' layers ]', best);
          console.log(best.copy());
          break;
        }
      }
    }
  }
  run(func){
    func(this.brain);
  }
}
export default Synapse;
