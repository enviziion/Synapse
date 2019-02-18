import Synapse from '../../source/constructors/synapse.js';

function normalize(arr){
	let result = [];
	if (arr[0] < 0) {
		result[0] = 0;
	} else {
		result[0] = 1;
	}
	return result;
}

function test(brain){
	let score = 0;
	let result;
	result = normalize(brain.input([0, 1]));
	score -= Math.abs(1 - result[0]);
	result = normalize(brain.input([1, 0]));
	score -= Math.abs(1 - result[0]);
	result = normalize(brain.input([1, 1]));
	score -= Math.abs(0 - result[0]);
	result = normalize(brain.input([0, 0]));
	score -= Math.abs(0 - result[0]);
	return score;
}

let synapse = new Synapse({
	inputSize: 2,
	outputSize: 1,
	targetScore: 0,
	targetComplexity: 8
});
synapse.train(function(brain){
	let score = test(brain);
	return score;
});
synapse.run(function(brain){
	console.log('[0][1] => [1] =>', normalize(brain.input([0, 1]))[0]);
	console.log('[1][0] => [1] =>', normalize(brain.input([1, 0]))[0]);
	console.log('[1][1] => [0] =>', normalize(brain.input([1, 1]))[0]);
	console.log('[0][0] => [0] =>', normalize(brain.input([0, 0]))[0]);
});
