const assert = require('assert');
const calculate = require('../index');

describe('Wrong expression return false', () => {

  it('incorrect symbols (a)', () => {
    assert.strictEqual(calculate('1a + 2'), false);
  });

  it('incorrect opening bracket', () => {
    assert.strictEqual(calculate('((1)'), false);
  });

  it('incorrect closing bracket', () => {
    assert.strictEqual(calculate('(1))'), false);
  });

  it('numbers with no math symbols beetween', () => {
    assert.strictEqual(calculate('1 + 2 3'), false);
  });

  it('dot without numbers on the sides', () => {
    assert.strictEqual(calculate('1 . 2'), false);
  });

  it('only dot', () => {
    assert.strictEqual(calculate('.'), false);
  });

  it('multiply after opening bracket', () => {
    assert.strictEqual(calculate('1 + (* 2 + 3)'), false);
  });

  it('divided after opening bracket', () => {
    assert.strictEqual(calculate('1 + (/ 2 + 3'), false);
  });

  it('multiply before closing bracket', () => {
    assert.strictEqual(calculate('(1 + 2 *) + 3'), false);
  });

  it('divided before closing bracket', () => {
    assert.strictEqual(calculate('(1 + 2 /) + 3'), false);
  });

  it('no math symbols before opening bracket', () => {
    assert.strictEqual(calculate('1 (2 + 3)'), false);
  });

  it('no math symbols after closing bracket', () => {
    assert.strictEqual(calculate('(1 + 2) 3'), false);
  });

  it('triple math symbols', () => {
    assert.strictEqual(calculate('1 + + + 1'), false);
  });

  it('triple math symbols with multiply', () => {
    assert.strictEqual(calculate('1 * + + 1'), false);
  });

  it('multiply after plus', () => {
    assert.strictEqual(calculate('1 + * 1'), false);
  });

  it('start with multiply', () => {
    assert.strictEqual(calculate('*1 * 3'), false);
  });

  it('start with double plus', () => {
    assert.strictEqual(calculate('++33'), false);
  });

  it('start with double minus', () => {
    assert.strictEqual(calculate('--31'), false);
  });

  it('start with double plus after bracket', () => {
    assert.strictEqual(calculate('(++33)'), false);
  });

  it('start with divide', () => {
    assert.strictEqual(calculate('/1 * 3'), false);
  });

  it('start with divide after bracket', () => {
    assert.strictEqual(calculate('(/1) * 3'), false);
  });

  it('double multiply', () => {
    assert.strictEqual(calculate('2 ** 2'), false);
  });

  it('double divide', () => {
    assert.strictEqual(calculate('2 // 2'), false);
  });

  it('total incorrect string', () => {
    assert.strictEqual(calculate('**) 1 ++/ 2 (*3a /) )(0.. - 4 5 . )'), false);
  });
});