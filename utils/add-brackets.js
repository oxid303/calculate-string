const calculateLiterals = require('./calculate-literals');

const addBrackets = arr => {

  const shift = ['+', '-'];
  const scale = ['*', '/'];
  const open = '(';
  const closed = ')';

  arr.splice(0, 0, open);
  arr.push(closed);

  for (let i = 0; i < arr.length; i++) {

    if (shift.some(s => s === arr[i]) && arr[i - 1] === open) {
      const num = calculateLiterals(0, arr[i], arr[i + 1]);
      arr.splice(i, 2, num);
    }

    if (scale.some(n => n === arr[i])) {
      let counter = 0;

      for (let j = i - 1; j > 0; j--) {
        if (arr[j] === closed) counter++;
        if (arr[j] === open) counter--;

        if (counter <= 0) {
          arr.splice(j, 0, open);
          break;

        } else continue;
      }

      counter = 0;
      i++;

      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] === open) counter++;
        if (arr[j] === closed) counter--;

        if (counter <= 0) {
          arr.splice(j + 1, 0, closed);
          break;

        } else continue;
      }
    }
  }
};

module.exports = addBrackets;