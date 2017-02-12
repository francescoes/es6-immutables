import {deepFreeze} from './utils/deep-freeze'

export class ImmutableArray extends Array {
  constructor() {
    super();
    const args = [...arguments];
    if (!args.length) return deepFreeze(this);
    return deepFreeze(Object.assign(this, args.reduce(x => x)));
  }

  push() {
    return new ImmutableArray([...this, ...arguments]);
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
}
