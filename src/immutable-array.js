import {deepFreeze} from './utils/deep-freeze'

const mutable = Symbol('mutable');
export class ImmutableArray extends Array {
  constructor() {
    super();
    this[mutable] = [...arguments];

    // if the constructor is empty
    if (!arguments.length) {
      Object.freeze(this);
    } else if (!Array.isArray(arguments[0])) {
      throw Error(`Illegal Argument: array expected, ${typeof arguments[0]} given instead`);
    } else {
      Object.assign(this, this[mutable].reduce(x => x));
      deepFreeze(this);
    }
  }

  push() {
    const array = [...this, ...arguments];
    Object.freeze(array);
    return array;
    //return new ImmutableArray([...this, ...arguments]);
  }

  pop() {
    return new ImmutableArray([...this].slice(0, -1));
  }

  shift() {
    return new ImmutableArray([...this].slice(1));
  }

  unshift() {
    return new ImmutableArray([...arguments, ...this]);
  }

  map() {
    const [func, thisObject] = [...arguments];
    return new ImmutableArray([...this].map(func, thisObject));
  }

  filter() {
    const [func, thisObject] = [...arguments];
    return new ImmutableArray([...this].filter(func, thisObject));
  }

  sort() {
    const [func] = [...arguments];
    return new ImmutableArray([...this].sort(func));
  }

  concat() {
    return new ImmutableArray([...this, ...arguments]);
  }

  reverse() {
    return new ImmutableArray([...this].reverse());
  }

  copyWithin() {
    const [target, start, end] = [...arguments];
    return new ImmutableArray([...this].copyWithin(target, start, end));
  }

  splice() {
    const thisArray = [...this];
    super.splice.apply(thisArray, [...arguments]);
    return new ImmutableArray(thisArray);
  }

  fill() {
    const [value, start, end] = [...arguments];
    return new ImmutableArray([...this].fill(value, start, end));
  }
}