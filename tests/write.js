const excavate = require('..');
const assert = require('assert');

describe('## write', () => {

  it('value must be changed', () => {
    let inc = 0;
    let b = 123;
    let a = { b };
    excavate({ a }, 'a.b', (value, key, base) => {
      assert.strictEqual(value, 123, 'value must be 123');
      base[key] = 456;
      inc++;
    });
    assert.strictEqual(a.b, 456, 'a.b must be 456');
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('item must be delete', () => {
    let inc = 0;
    let b = 123;
    let a = { b };
    excavate({ a }, 'a.b', (value, key, base) => {
      assert.strictEqual(value, 123, 'value must be 123');
      delete base[key];
      inc++;
    });
    assert(!('b' in a), 'property "b" must not in a');
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('attach new item', () => {
    let inc = 0;
    let b = 123;
    let a = { b };
    excavate({ a }, 'a.b', (value, key, base) => {
      assert.strictEqual(value, 123, 'value must be 123');
      base[key + '_attach'] = 'hehe';
      inc++;
    });
    assert.strictEqual(a.b_attach, 'hehe', 'a.b_attach must be "hehe"');
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

  it('remove other item', () => {
    let inc = 0;
    let b = 123;
    let a = { b, c: 1 };
    excavate({ a }, 'a.b', (value) => {
      assert.strictEqual(value, 123, 'value must be 123');
      assert.strictEqual(a.c, 1, 'a.c must be 1');
      delete a.c;
      inc++;
    });
    assert(!('c' in a), 'property "c" must not in a');
    assert.strictEqual(inc, 1, 'inc must be 1');
  });

});
