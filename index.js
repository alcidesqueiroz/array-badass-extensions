'use strict';

const ex = {};

const exSymbol = Symbol('ex');

function extendArray() {
  Object.defineProperty(Array.prototype, 'ex', {
    get() {
      if (this[exSymbol]) return this[exSymbol];

      const abe = {};

      Object.entries(ex).forEach((entry) => {
        abe[entry[0]] = (...args) => entry[1](this, ...args);
      });

      this[exSymbol] = abe;
      return abe;
    }
  });
}

module.exports = { ...ex, extendArray };
