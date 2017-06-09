const walk = function *(base, key, path, length, pos = 0) {
  if (base instanceof Array) {
    for (let i = 0; i < base.length; i++) yield *walk(base[i], key, path, length, pos);
  } else if (base instanceof Object) {
    if (pos < length) {
      yield *walk(base[path[pos]], key, path, length, pos + 1);
    } else {
      if (key in base) yield [ base[key], key, base ];
    }
  }
};

const excavator = (base, path, callback) => {
  if (path === void 0 || path === null) throw new TypeError('<path> must not be empty');
  if (!(path instanceof Array)) path = (path + '').split('.');
  let length = path.length - 1;
  let key = path[length];
  if (typeof callback === 'function') {
    for (let head of walk(base, key, path, length)) callback(...head);
  } else {
    return walk(base, key, path, length);
  }
};

module.exports = excavator;
