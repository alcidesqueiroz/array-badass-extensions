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
