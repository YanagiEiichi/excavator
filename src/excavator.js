const walk = function *(base, path, length, pos = 0) {
  if (base instanceof Array) {
    for (let i = 0; i < base.length; i++) yield *walk(base[i], path, length, pos);
  } else if (base instanceof Object) {
    if (pos < length) {
      yield *walk(base[path[pos]], path, length, pos + 1);
    } else {
      yield base;
    }
  }
};

module.exports = (base, path, callback) => {
  if (typeof callback !== 'function') throw new TypeError('<callback> must be a function');
  if (path === void 0 || path === null) throw new TypeError('<path> must not be empty');
  if (!(path instanceof Array)) path = (path + '').split('.');
  let length = path.length - 1;
  let key = path[length];
  for (let head of walk(base, path, length)) if (key in head) callback(head[key], key, head);
};
