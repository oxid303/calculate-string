const calculateLiterals = require('./calculate-literals');

const calculateArr = arr => {

  const open = '(';
  const closed = ')';

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === closed) {

      for (let r = i; r >= 0, r <= i; r--) {
        if (arr[r] === open) {

          let sum = 0;
          let prev = '+';
          
          for (let c = 0; r <= i; c++) {

            if (r === i) {
              arr.splice(r, 1, sum);
              r += 2;
              break;
            }
            if (c === 0) {
              arr.splice(r, 1);
              i--;
              continue;
            }
            if (c % 2 === 0) {
              prev = arr[r];
              arr.splice(r, 1);
              i--;
              continue;
            }
            if (c % 2) {
              sum = calculateLiterals(sum, prev, arr[r]);
              arr.splice(r, 1);
              i--;
              continue;
            }
          }
        }
      }
    }
  }
};

module.exports = calculateArr;