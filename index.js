const calculate = str => {
  if (typeof str !== 'string') return false;
  str = str.trim().replace(/\s+/g, ' ');

  const nums = new Set();
  nums.add('0').add('1').add('2').add('3').add('4')
    .add('5').add('6').add('7').add('8').add('9').add('.');

  const shift = new Set();
  shift.add('+').add('-');

  const scale = new Set();
  scale.add('*').add('/');

  const open = '(';
  const closed = ')';

  const stack = [];
  const length = str.length + 1;
  let currNum = '';
  let numDisabled = false;
  let prevShiftNum = 0;
  let prevShift = true;
  let prevScaleNum = false;
  let prevScale = true;
  let start = true;
  let mathDisabled = true;
  let counter = 0;

  for (let i = 0; i < length; i++) {
    const char = str[i];

    if (char === ' ') {
      if (currNum) numDisabled = true;

    } else if (nums.has(char)) {
      if (numDisabled) return false;
      start = false;
      mathDisabled = false;
      currNum += char;

    } else if (scale.has(char)) {
      if (mathDisabled || currNum === '.') return false;
      start = false;
      mathDisabled = true;
      numDisabled = false;
      currNum = Number(currNum);
      if (prevScaleNum === false) {
        prevScaleNum = currNum;
      } else {
        prevScaleNum = prevScale ?
          prevScaleNum * currNum :
          prevScaleNum / currNum;
      }
      prevScale = char === '*';
      currNum = '';

    } else if (shift.has(char)) {
      if (mathDisabled && !start || currNum === '.') return false;
      start = false;
      mathDisabled = true;
      numDisabled = false;
      if (currNum === '') {
        prevShift = char === '+';
        continue;
      }
      currNum = Number(currNum);
      if (prevScaleNum === false) {
        prevShiftNum = prevShift ?
          prevShiftNum + currNum :
          prevShiftNum - currNum;
      } else {
        prevScaleNum = prevScale ?
          prevScaleNum * currNum :
          prevScaleNum / currNum;
        prevShiftNum = prevShift ?
          prevShiftNum + prevScaleNum :
          prevShiftNum - prevScaleNum;
        prevScaleNum = false;
      }
      prevShift = char === '+';
      currNum = '';

    } else if (char === open) {
      if (!mathDisabled) return false;
      counter++;
      stack.push({
        prevShiftNum,
        prevShift,
        prevScaleNum,
        prevScale,
      });
      prevShiftNum = 0;
      prevShift = true;
      prevScaleNum = false;
      prevScale = true;
      start = true;
      mathDisabled = true;

    } else if (char === closed) {
      if (mathDisabled && !start || currNum === '.' || --counter < 0) return false;
      if (currNum === '') {
        currNum = prevShiftNum;
      }
      currNum = Number(currNum);
      if (prevScaleNum === false) {
        currNum = prevShift ?
          prevShiftNum + currNum :
          prevShiftNum - currNum;
      } else {
        prevScaleNum = prevScale ?
          prevScaleNum * currNum :
          prevScaleNum / currNum;
        currNum = prevShift ?
          prevShiftNum + prevScaleNum :
          prevShiftNum - prevScaleNum;
      }
      const stackLast = stack.pop();
      prevShiftNum = stackLast.prevShiftNum;
      prevShift = stackLast.prevShift;
      prevScaleNum = stackLast.prevScaleNum;
      prevScale = stackLast.prevScale;
      numDisabled = true;
      start = false;
      mathDisabled = false;

    } else if (i === str.length) {
      if (mathDisabled && !start || currNum === '.' || counter > 0) return false;
      currNum = Number(currNum);
      if (prevScaleNum === false) {
        prevShiftNum = prevShift ?
          prevShiftNum + currNum :
          prevShiftNum - currNum;
      } else {
        prevScaleNum = prevScale ?
          prevScaleNum * currNum :
          prevScaleNum / currNum;
        prevShiftNum = prevShift ?
          prevShiftNum + prevScaleNum :
          prevShiftNum - prevScaleNum;
      }
      return prevShiftNum;

    } else return false;
  }
};

module.exports = calculate;