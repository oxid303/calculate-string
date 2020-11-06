const assert = require('assert');
const calculate = require('../index');

describe('Correct expression', () => {

  it('simple addition', () => {
    assert.strictEqual(calculate('1 + 2'), 3);
  });

  it('simple addition with brackets', () => {
    assert.strictEqual(calculate('1 + (2 + 3)'), 6);
  });

  it('multiply by zero', () => {
    assert.strictEqual(calculate('1 * 0'), 0);
  });

  it('start with plus', () => {
    assert.strictEqual(calculate('+1 * 3'), 3);
  });

  it('start with minus', () => {
    assert.strictEqual(calculate('-1 * 3'), -3);
  });

  it('plus after opening bracket', () => {
    assert.strictEqual(calculate('1 + (+3 - 2)'), 2);
  });

  it('minus after opening bracket', () => {
    assert.strictEqual(calculate('1 + (-3 - 2)'), -4);
  });

  it('divide before multiply', () => {
    assert.strictEqual(calculate('5 / 2 * 9'), 22.5);
  });

  it('multiply before brackets', () => {
    assert.strictEqual(calculate('1 * (2 * 3)'), 6);
  });

  it('multiply after brackets', () => {
    assert.strictEqual(calculate('(1 * 2) * 3'), 6);
  });

  it('few brackets', () => {
    assert.strictEqual(calculate('1 + (5 * 5) * (4 * 4)'), 401);
  });

  it('random spaces', () => {
    assert.strictEqual(calculate('   5   -2  *( 10 - 6 )  '), -3);
  });

  it('plus before brackets at the start', () => {
    assert.strictEqual(calculate('+(21 + 1 + (3 + 2 * 9)) - 2 + (1 + (3 + 18))'), 63);
  });

  it('minus between brackets', () => {
    assert.strictEqual(calculate('(-(-22 / .5 * (-.25)) + 3) * 5 + 3.1 * 10'), -9);
  });

  it('some expression', () => {
    assert.strictEqual(calculate('7 - 9 * (2 + 6 / 4) / (9 / (.05 * 60))'), -3.5);
  });

  it('plus plus', () => {
    assert.strictEqual(calculate('1 + + 1'), 2);
  });

  it('minus minus', () => {
    assert.strictEqual(calculate('1 - - 1'), 2);
  });

  it('multiply on positive number', () => {
    assert.strictEqual(calculate('2 * + 2'), 4);
  });

  it('multiply on negative number', () => {
    assert.strictEqual(calculate('2 * - 2'), -4);
  });

  it('divide on positive number', () => {
    assert.strictEqual(calculate('2 / + 2'), 1);
  });

  it('divide on negative number', () => {
    assert.strictEqual(calculate('2 / - 2'), -1);
  });

  it('multiply on positive brackets', () => {
    assert.strictEqual(calculate('2 * + (5)'), 10);
  });

  it('divide on negative brackets', () => {
    assert.strictEqual(calculate('3 / - (6)'), -0.5);
  });

  it('brackets multiply on negative brackets', () => {
    assert.strictEqual(calculate('-(-2) * - (7)'), -14);
  });

  it('brackets divide on positive brackets', () => {
    assert.strictEqual(calculate('(3 ++ 1) / - (2)'), -2);
  });

  it('some expression', () => {
    assert.strictEqual(calculate('7 * 7 * 2 / 2 / 7 / -7'), -1);
  });

  it('some expression', () => {
    assert.strictEqual(calculate('-(-(+(-3)) + 2) / - (+5)'), 1);
  });
});