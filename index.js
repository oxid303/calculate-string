const transformToArr = require('./utils/transform-to-arr');
const checkOrder = require('./utils/check-order');
const addBrackets = require('./utils/add-brackets');
const calculateArr = require('./utils/calculate-arr');

const calculate = str => {
  if (typeof str !== 'string') return false;
  str = str.trim().replace(/\s+/g, ' ');

  let arr = transformToArr(str);
  if (arr === false) return false;
  if (!checkOrder(arr)) return false;

  addBrackets(arr);
  calculateArr(arr);

  return Number(arr);

};

module.exports = calculate;