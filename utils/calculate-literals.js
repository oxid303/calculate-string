const calculateLiterals = (firstNum, symbolStr, secondNum) => {
  if (symbolStr === '+') return firstNum + secondNum;
  if (symbolStr === '-') return firstNum - secondNum;
  if (symbolStr === '*') return firstNum * secondNum;
  if (symbolStr === '/') return firstNum / secondNum;
};

module.exports = calculateLiterals;