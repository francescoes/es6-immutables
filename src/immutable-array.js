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
      console.log(args[0]);
      throw Error(`Illegal Argument: array expected, ${typeof args[0]} given instead`);
    } else {
      Object.assign(this, args.reduce(x => x));
      deepFreeze(this);
    }

    cache[JSON.stringify(this)] = this;
  }

  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() { return []; }

  push() {
    return Immutables.Array([...this, ...arguments]);
  }

  pop() {
    return Immutables.Array(super.slice.call([this], 0, -1));
  }

  shift() {
    return Immutables.Array([...this].slice(1));
  }

  unshift() {
    return Immutables.Array([...arguments, ...this]);
  }

  map() {
    const [func, thisObject] = [...arguments];
    return Immutables.Array([...this].map(func, thisObject));
  }

  filter() {
    const [func, thisObject] = [...arguments];
    return Immutables.Array([...this].filter(func, thisObject));
  }

  sort() {
    const [func] = [...arguments];
    return Immutables.Array([...this].sort(func));
  }

  concat() {
    return Immutables.Array([...this, ...arguments]);
  }

  reverse() {
    return Immutables.Array([...this].reverse());
  }

  copyWithin() {
    const [target, start, end] = [...arguments];
    return Immutables.Array([...this].copyWithin(target, start, end));
  }

  splice() {
    const thisArray = [...this];
    super.splice.apply(thisArray, [...arguments]);
    return Immutables.Array(thisArray);
  }

  fill() {
    const [value, start, end] = [...arguments];
    return Immutables.Array([...this].fill(value, start, end));
  }
}