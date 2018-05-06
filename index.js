'use strict';

const ex = {};

ex.first = (arr, qt = 1) => {
  const a = arr.slice(0, qt);
  return qt === 1 ? a[0] : a;
};

ex.last = (arr, qt = 1) => {
  const a = arr.slice(qt * -1);
  return qt === 1 ? a[0] : a;
};

ex.isEmpty = arr => arr.length === 0;

ex.include = (arr, value) => arr.indexOf(value) > -1;

ex.includeSome = (arr, ...values) => values.some(value => arr.indexOf(value) > -1);

ex.includeAll = (arr, ...values) => values.every(value => arr.indexOf(value) > -1);

ex.drop = (arr, qt) => (qt >= arr.length ? [] : arr.slice(-(arr.length - qt)));

ex.dropWhile = (arr, fn) => {
  let finished = false;

  return arr.filter((item) => {
    if (finished) return true;
    if (!fn(item)) finished = true;
    return finished;
  });
};

ex.insert = (arr, index, ...values) => {
  const copy = [...arr];
  copy.splice(index, 0, ...values);
  return copy;
};

ex.$insert = (arr, index, ...values) => {
  arr.splice(index, 0, ...values);
  return arr;
};

ex.delete = (arr, value) => arr.filter(item => item !== value);

ex.$delete = (arr, value) => {
  for (;;) {
    const index = arr.indexOf(value);
    if (index === -1) break;
    arr.splice(index, 1);
  }
  return arr;
};

ex.deleteAt = (arr, index) => {
  const copy = [...arr];
  copy.splice(index, 1);
  return copy;
};

ex.$deleteAt = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

ex.$deleteIf = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

ex.compact = arr => arr.filter(item => [null, undefined].indexOf(item) === -1);

ex.$compact = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if ([null, undefined].indexOf(item) > -1) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

ex.uniq = arr => [...new Set(arr)];

ex.$uniq = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (arr.indexOf(item) > -1) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

ex.minus = (arr, arr2) => arr.filter(item => arr2.indexOf(item) === -1);

ex.$minus = (arr, arr2) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (arr2.indexOf(item) > -1) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

ex.assoc = (arr, val) => arr.filter(item => item && item[0] === val)[0];

ex.rassoc = (arr, val) => arr.filter(item => item && item[item.length - 1] === val)[0];

ex.at = (arr, pos) => arr.slice(pos, pos !== -1 ? (pos + 1) : undefined)[0];

ex.$clear = (arr) => {
  arr.length = 0;
  return arr;
};

ex.count = (arr, ...args) => arr.filter(item => args.length === 0 || item === args[0]).length;

ex.countIf = (arr, fn) => arr.filter(item => fn(item)).length;

ex.cycle = (arr, n = 1, fn) => {
  for (let i = 0; i < n; i++) {
    arr.forEach(item => fn(item));
  }
};

ex.flatten = function flatten(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ? flatten(flattened) : flattened;
};

ex.$flatten = function $flatten(arr) {
  const flattened = arr.ex.flatten();
  arr.length = 0;
  arr.push(...flattened);
  return arr;
};

ex.take = (arr, qt) => arr.slice(0, qt);

ex.takeWhile = (arr, fn) => {
  let finished = false;

  return arr.filter((item) => {
    if (finished) return false;
    if (!fn(item)) finished = true;
    return !finished;
  });
};


const exSymbol = Symbol('ex');

function extendArray() {
  const exProp = {
    get() {
      if (this[exSymbol]) return this[exSymbol];

      const abex = {};

      Object.entries(ex).forEach((entry) => {
        abex[entry[0]] = (...args) => entry[1](this, ...args);
      });

      this[exSymbol] = abex;
      return abex;
    }
  };

  /* eslint-disable */
  Object.defineProperty(Array.prototype, 'ex', exProp);
  /* eslint-enable */
}

module.exports = { ...ex, extendArray };
