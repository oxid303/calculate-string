const assert = require('assert');
const calculate = require('../index');

describe('Wrong value type return false', () => {

  it('no value present', () => {
    assert.strictEqual(calculate(), false);
  });

  it('value is true', () => {
    assert.strictEqual(calculate(true), false);
  });

  it('value is false', () => {
    assert.strictEqual(calculate(false), false);
  });

  it('value is number (0)', () => {
    assert.strictEqual(calculate(0), false);
  });

  it('value is number (1)', () => {
    assert.strictEqual(calculate(1), false);
  });

  it('value is expression (2 + 3)', () => {
    assert.strictEqual(calculate(2 + 3), false);
  });

  it('value is object', () => {
    assert.strictEqual(calculate({}), false);
  });
});