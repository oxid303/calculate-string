const assert = require('assert');
const calculate = require('../index');

describe('Correct number', () => {

  it('only one number', () => {
    assert.strictEqual(calculate('35'), 35);
  });

  it('only one number with plus at the begin', () => {
    assert.strictEqual(calculate('+33'), 33);
  });

  it('only one number with minus at the begin', () => {
    assert.strictEqual(calculate('-31'), -31);
  });

  it('big number', () => {
    assert.strictEqual(calculate('1000000000000000000000'), +1e+21);
  });

  it('dot with number on the right only', () => {
    assert.strictEqual(calculate('.5'), 0.5);
  });

  it('dot with zero on the right only', () => {
    assert.strictEqual(calculate('.000'), 0);
  });

  it('dot with number on the left only', () => {
    assert.strictEqual(calculate('77.'), 77);
  });

  it('dot with zero on the left only', () => {
    assert.strictEqual(calculate('000.'), 0);
  });

  it('dot with numbers on the sides', () => {
    assert.strictEqual(calculate('3.39'), 3.39);
  });

  it('dot with zeros on the sides', () => {
    assert.strictEqual(calculate('000.000'), 0);
  });
});