let excavate = require('..');
let assert = require('assert');

describe('## iterator', () => {

  it('return an iterator', () => {
    let hitCount = 0;
    let one = { get a() { hitCount++; return 1; } };
    let two = { get a() { hitCount++; return 2; } };
    let iterator = excavate([ one, two ], 'a');
    for (let [ value, key, object ] of iterator) {
      assert.equal(hitCount, 1, 'hitCount must be 1');
      assert.equal(value, 1, 'value must be 1');
      assert.equal(key, 'a', 'key must be a');
      assert.equal(object, one, 'object must be one');
      break;
    }
    for (let [ value, key, object ] of iterator) {
      assert.equal(hitCount, 2, 'hitCount must be 2');
      assert.equal(value, 2, 'value must be 2');
      assert.equal(key, 'a', 'key must be a');
      assert.equal(object, two, 'object must be two');
      break;
    }
    for (let item of iterator) {
      void item;
      throw new Error('iterator must be done');
    }
  });

});
