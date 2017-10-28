const getRandomNumber = require('./getRandomNumber');
function getRandomLowNumber(min=1,max=100,factor=1){
  let num = getRandomNumber(min,max);
  let rollDiff = num - min;
  let percent = (rollDiff) / (max - min);
  percent = 1 - (1 - percent) / factor;
  return Math.round(rollDiff * percent + min);
}
module.exports = getRandomLowNumber;
