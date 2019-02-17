import Synapse from '../../source/constructors/synapse.js';

function iterate(source, storage) {
	let thread1 = source.slice();
	let thread2 = source.slice();
	thread1.push(0);
	thread2.push(1);
	if (thread1.length == 8) {
		storage.push(thread1);
	} else {
		iterate(thread1, storage);
	}
	if (thread2.length == 8) {
		storage.push(thread2);
	} else {
		iterate(thread2, storage);
	}
}

function xor(arr, brain) {
	let totalScore = 0;
	arr.forEach((item) => {
		let arr1 = item.slice(0, 4);
		let arr2 = item.slice(4, 8);
		let arrxor1 = [];
		let arrxor2 = brain.input(item);
		let arrxor2Conv = [];
		for (let i = 0; i < 4; i++) {
			if (arr1[i] == arr2[i]) {
				arrxor1.push(0);
			} else {
				arrxor1.push(1);
			}
		}
		arrxor2.forEach((val)=> {
			let converted;
			if (val > 0) {
				converted = 1;
			} else {
				converted = 0;
			}
			arrxor2Conv.push(converted);
		});
		//console.log(arr1, arr2, arrxor1, arrxor2Conv, arrxor2)
		let iterativeScore = score(arrxor2Conv, arrxor1);
		totalScore += iterativeScore;
		//console.log('score', current, 'arr1', arr1, 'arr2', arr2, 'arrxor2', arrxor2, 'arrxor1', arrxor1, 'arrxorConv', arrxor2Conv)
	});
	return totalScore;
}

function score(arr, arrTarget){
	let score = 0;
	arr.forEach((val, index)=> {
		let diff = Math.abs(arrTarget[index] - val);
		//console.log('Diff', diff)
		score -= diff;
	});
	//console.log('Score', score)
	return score;
}

let result = [];
iterate([], result);
console.log('Tests', result);
let synapse = new Synapse(8, 4, function(brain){
	//console.time('Test');
	let score = xor(result, brain);
	//console.timeEnd('Test');
	return score;
}, -300);
