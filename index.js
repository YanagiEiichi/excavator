const walk = function*(base, path, pos = 0) {
  if (base instanceof Array) {
    for (let i = 0; i < base.length; i++) yield* walk(base[i], path, pos);
  } else if (base instanceof Object) {
    if (pos < path.length) {
      yield* walk(base[path[pos]], path, pos + 1);
    } else {
      yield base;
    }
  }
};

module.exports = (base, path, callback) => {
  if (typeof callback !== 'function') throw new TypeError('<callback> must be a function');
  if (typeof path !== 'string') throw new TypeError('<path> must be a string');
  path = path.split('.');
  let key = path.pop();
  for (let head of walk(base, path)) callback(head[key], key, head);
};
