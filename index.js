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
  let positive = true;
  let start = true;
  let scaleDisabled = true;
  let shiftDisabled = true;
  let counter = 0;

  for (let i = 0; i < length; i++) {
    const char = str[i];

    if (char === ' ') {
      if (currNum) numDisabled = true;

    } else if (nums.has(char)) {
      if (numDisabled) return false;
      start = false;
      scaleDisabled = false;
      shiftDisabled = false;
      currNum += char;

    } else if (scale.has(char)) {
      if (scaleDisabled || currNum === '.') return false;
      start = false;
      numDisabled = false;
      scaleDisabled = true;
      currNum = positive ? Number(currNum) : -Number(currNum);
      positive = true;
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
      if (scaleDisabled && !start && shiftDisabled || currNum === '.') return false;
      start = false;
      numDisabled = false;
      if (scaleDisabled) {
        shiftDisabled = true;
        positive = char === '+';
      } else {
        scaleDisabled = true;
        if (currNum === '') {
          prevShift = char === '+';
          continue;
        }
        currNum = positive ? Number(currNum) : -Number(currNum);
        positive = true;
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
      }

    } else if (char === open) {
      if (!scaleDisabled) return false;
      counter++;
      stack.push({
        prevShiftNum,
        prevShift,
        prevScaleNum,
        prevScale,
        positive,
      });
      prevShiftNum = 0;
      prevShift = true;
      prevScaleNum = false;
      prevScale = true;
      positive = true;
      start = true;
      scaleDisabled = true;
      shiftDisabled = true;

    } else if (char === closed) {
      if (scaleDisabled && !start || currNum === '.' || --counter < 0) return false;
      if (currNum === '') {
        currNum = prevShiftNum;
      }
      currNum = positive ? Number(currNum) : -Number(currNum);
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
      positive = stackLast.positive;
      numDisabled = true;
      start = false;
      scaleDisabled = false;
      shiftDisabled = false;

    } else if (i === str.length) {
      if (scaleDisabled && !start || currNum === '.' || counter > 0) return false;
      currNum = positive ? Number(currNum) : -Number(currNum);
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