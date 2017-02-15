import { deepFreeze } from './utils/deep-freeze';

export const Immutables = {
   Array(array = []) {
     const key = JSON.stringify(array);
     return cache[key] ? cache[key] : new ImmutableArray(array);
   }
};

const cache = {};

class ImmutableArray extends Array {
  constructor() {
    super();
    const args = [...arguments];

    // if the constructor is empty
    if (!args.length) {
      Object.freeze(this);
    } else if (!Array.isArray(args[0])) {
      console.log(args);
      throw Error(`Illegal Argument: array expected, ${typeof args[0]} given instead`);
    } else {
      Object.assign(this, args.reduce(x => x));
      deepFreeze(this);
    }

    cache[JSON.stringify(this)] = this;
  }

  static get [Symbol.species]() { return Array; }

  push() {
    return this.concat(...arguments);
  }

  pop() {
    return Immutables.Array(super.slice.call(this, 0, -1));
  }

  shift() {
    return Immutables.Array(super.slice.call(this, 1));
  }

  unshift() {
    return Immutables.Array(super.concat.call([...arguments], this));
  }

  map(func, thisObject) {
    return Immutables.Array(super.map.call(this, func, thisObject));
  }

  filter(func, thisObject) {
    return Immutables.Array(super.filter.call(this, func, thisObject));
  }

  sort(func) {
    return Immutables.Array([...this].sort(func));
  }

  concat() {
    return Immutables.Array(super.concat.call(this, [...arguments]));
  }

  reverse() {
    return Immutables.Array([...this].reverse());
  }

  copyWithin(target, start, end) {
    return Immutables.Array([...this].copyWithin(target, start, end));
  }

  splice() {
    const thisArray = [...this];
    super.splice.call(thisArray, ...arguments);
    return Immutables.Array(thisArray);
  }

  fill(value, start, end) {
    return Immutables.Array([...this].fill(value, start, end));
  }
}