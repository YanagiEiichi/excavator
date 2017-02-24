let excavate = require('..');
let assert = require('assert');

describe('## exception', () => {

  it('must be thrown on error path', done => {
    try {
      excavate({}, null, () => {});
    } catch (error) {
      assert(error instanceof TypeError, 'error must be a TypeError');
      return done();
    }
    throw Error('must be thrown');
  });

  it('must be thrown without callback', done => {
    try {
      excavate({}, 'hehe');
    } catch (error) {
      assert(error instanceof TypeError, 'error must be a TypeError');
      return done();
    }
    throw Error('must be thrown');
  });

});
