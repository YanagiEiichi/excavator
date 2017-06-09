let excavate = require('..');
let assert = require('assert');

describe('## array path', () => {

  it('array path must be supported', done => {
    try {
      excavate({ a: { b: 123 } }, [ 'a', 'b' ], value => {
        throw value;
      });
    } catch (value) {
      assert.equal(value, 123, 'value must be 123');
      done();
    }
    throw Error('wtf');
  });

  it('array path must not be changed', done => {
    let raw = [ 'a', 'b', 'c', 'd' ];
    let path = JSON.parse(JSON.stringify(raw));
    let d = 123;
    let c = { d };
    let b = { c };
    let a = { b };
    let results = [];
    excavate({ a }, path, value => results.push(value));
    assert.strictEqual(results.length, 1, 'count of results must be 1');
    assert.strictEqual(results[0], 123, 'first result must be 123');
    assert.deepEqual(path, raw, 'path must be deep equals with raw');
    done();
  });

});
