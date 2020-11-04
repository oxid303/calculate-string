const transformToArr = str => {

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const symbols = ['+', '-', '*', '/', '(', ')'];

  const arr = [];
  let num = '';

  for (let i = 0; i < str.length; i++) {

    if (numbers.some(n => n === str[i]) || str[i] === ' ') {
      num += str[i];

    } else if (symbols.some(s => s === str[i])) {

      if (num.length && !/^\s+$/.test(num)) {
        num = Number(num);
        if (isNaN(num)) return false;

        arr.push(num);
        num = '';
      }
      arr.push(str[i]);

    } else return false;
  }

  if (num.length && !/^\s+$/.test(num)) {
    num = Number(num);
    if (isNaN(num)) return false;

    arr.push(num);
  }

  return arr;
};

module.exports = transformToArr;