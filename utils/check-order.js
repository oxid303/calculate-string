const checkOrder = arr => {

  const shift = ['+', '-'];
  const scale = ['*', '/'];
  const mathSymbols = ['+', '-', '*', '/'];
  const open = '(';
  const closed = ')';
  let counter = 0;

  if (shift.some(s => s === arr[arr.length - 1])) return false;
  if (scale.some(s => s === arr[0] || s === arr[arr.length - 1])) return false;

  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    const next = arr[i + 1];

    if (curr === open) counter++;
    if (curr === closed) counter--;
    if (counter < 0) return false;

    if (
      typeof curr === 'number' && next === open ||
      curr === closed && typeof next === 'number' ||
      curr === open && scale.some(s => s === next) ||
      mathSymbols.some(s => s === curr) &&
      (mathSymbols.some(s => s === next) || next === closed)
      
    ) return false;
  }

  return counter === 0;
};

module.exports = checkOrder;