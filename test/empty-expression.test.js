const assert = require('assert');
const calculate = require('../index');

describe('Empty expression return zero (number)', () => {

  it('empty string', () => {
    assert.strictEqual(calculate(''), 0);
  });

  it('only spaces', () => {
    assert.strictEqual(calculate('     '), 0);
  });

  it('only brackets', () => {
    assert.strictEqual(calculate('()'), 0);
  });

  it('more brackets', () => {
    assert.strictEqual(calculate('((()))'), 0);
  });

  it('brackets with math symbols', () => {
    assert.strictEqual(calculate('( ) + ( )'), 0);
  });
});