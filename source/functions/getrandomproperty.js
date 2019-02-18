import getRandomNumber from './getrandomnumber.js';

function getRandomProperty(obj) {
  let keys = Object.keys(obj);
  let key = keys[getRandomNumber(0, keys.length - 1)];
  return obj[key];
}
export default getRandomProperty;
