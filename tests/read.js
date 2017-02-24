const excavate = require('..');
const assert = require('assert');

describe('## read', () => {

  it('must through all object', () => {
    let inc = 0;
    let g = 233;
    let f = { g };
    let e = { f };
    let d = { e };
    let c = { d };
    let b = { c };
    let a = { b };
    excavate({ a }, 'a.b.c.d.e.f.g', (value, key, base) => {
      assert.strictEqual(value, 233, 'value must be 233');
      inc++;
    });
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('must through all array', () => {
    let inc = 0;
    let a = [ [ [ [ [ { b: 1 } ] ] ] ] ];
    excavate({ a }, 'a.b', (value, key, base) => {
      assert.strictEqual(value, 1, 'value must be 1');
      inc++;
    });
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('must ignore null item', () => {
    let inc = 0;
    let a = [ { b: 1 }, { b: 2 }, null ];
    excavate({ a }, 'a.b', (value, key, base) => {
      assert.strictEqual(key, 'b', 'key must be "b"');
      assert.strictEqual(typeof base, 'object', 'base must be an object');
      switch (value) {
        case 1: return inc++;
        case 2: return inc++;
        default: throw new Error('value is not match');
      }
    });
    assert.strictEqual(inc, 2, 'inc must be 2');
  });

  it('must find an object', () => {
    let inc = 0;
    let a = [ { b: /hehe/ } ];
    excavate({ a }, 'a.b', (value, key, base) => {
      assert(value instanceof RegExp, 'value must be a RegExp');
      inc++;
    });
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('must find an array', () => {
    let inc = 0;
    let a = [ { b: [ 1, 2, 3 ] } ];
    excavate({ a }, 'a.b', (value, key, base) => {
      assert(value instanceof Array, 'value must be a Array');
      assert.strictEqual(value.length, 3, 'value.length must be a 3');
      inc++;
    });
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('must find a null', () => {
    let inc = 0;
    let a = [ { b: null } ];
    excavate({ a }, 'a.b', (value, key, base) => {
      assert.strictEqual(value, null, 'value must be null');
      inc++;
    });
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('must find an undefined', () => {
    let inc = 0;
    let a = [ { b: void 0 } ];
    excavate({ a }, 'a.b', (value, key, base) => {
      assert.strictEqual(value, void 0, 'value must be null');
      inc++;
    });
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('must not find any one', () => {
    let a = [ {} ];
    excavate({ a }, 'a.b', (value, key, base) => {
      throw new Error('callback must not call');
    });
  });

});
