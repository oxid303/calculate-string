const assert = require('assert');
const calculate = require('../index');

describe('Divided by zero', () => {

  it('zero divided by zero return NaN', () => {
    assert.strictEqual(isNaN(calculate('0 / 0')), true);
  });

  it('positive number divided by zero return positive infinity', () => {
    assert.strictEqual(calculate('1 / 0'), Infinity);
  });

  it('negative number divided by zero return negative infinity', () => {
    assert.strictEqual(calculate('-1 / 0'), -Infinity);
  });

  it('positive number divided by negative zero return positive infinity', () => {
    assert.strictEqual(calculate('1 / (-0)'), Infinity);
  });
});