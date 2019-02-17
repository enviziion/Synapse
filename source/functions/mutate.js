import mutations from './mutations.js';
import getRandomNumber from './getrandomnumber.js';
import getRandomProperty from './getrandomproperty.js';
var mutationList = [];
Object.keys(mutations).map((key) => {
	for (let i = 0; i < mutations[key].frequency; i++) {
		mutationList.push(key);
	}
});

function mutate(child) {
	const max = child.mutationRate;
	for (let i = 0; i < max; i++) {
		if (mutationList.length > 0) {
			var rand = getRandomNumber(0, mutationList.length - 1);
			var mutation = mutationList[rand];
			mutations[mutation].mutate(child);
		}
	}
}

export default mutate;
