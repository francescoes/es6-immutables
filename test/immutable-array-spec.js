import { assert } from 'chai';
import { Immutables } from '../src/immutables';

describe('Array#constructor', () => {
  it('constructor: creates an array', () => {
    const list = Immutables.Array([1, 2, { item: 2 }, []]);
    assert.isTrue(list instanceof Array);
  });
});

describe('Array#equality', () => {
  it('strict equal returns true on two arrays with the same elements', () => {
    const list = Immutables.Array([1, 2, { item: 2 }, []]);
    const anotherList = Immutables.Array([1, 2, { item: 2 }, []]);
    assert.strictEqual(list, anotherList);
  });
});

describe('Array#push', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });

  it('returns a new array adding an element at the end without mutating the original', () => {
    const anotherList = list.push(1);
    assert.deepEqual(anotherList, [1]);
    assert.deepEqual(list, []);
  });

  it('returns a new array adding multiple elements at the end', () => {
    const anotherList = list.push(1, 2, 3, 4).push(5);
    assert.deepEqual(anotherList, [1, 2, 3, 4, 5]);
  });

  it('returns a new array adding multiple elements of different data types', () => {
    const anotherList = list.push({ item: 1 }, [1, 2, 'string'], 'string', null).push(true);
    assert.deepEqual(anotherList, [{ item: 1 }, [1, 2, 'string'], 'string', null, true]);
  });
});


describe('Array#pop', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new immutable array removing the last element without mutating the original', () => {
    const secondList = list.push({ item: 2 });
    const thirdList = secondList.pop();
    assert.deepEqual(secondList, [{ item: 2 }]);
    assert.deepEqual(thirdList, []);
    thirdList.push(2);
    assert.deepEqual(thirdList, []);
  });
});

describe('Array#map', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new array immutable array of pow elements', () => {
    const secondList = list.push(1, 2, 3, 4);
    const thirdList = secondList.map(x => x * x);
    assert.deepEqual(thirdList, [1, 4, 9, 16]);
    thirdList.pop();
    assert.deepEqual(thirdList, [1, 4, 9, 16]);
  });
});

describe('Array#filter', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new array immutable array of filterd elements', () => {
    const secondList = list.push(1, 5, 10, 22, 15, 28);
    const thirdList = secondList.filter(x => x % 5 === 0);
    assert.deepEqual(secondList, [1, 5, 10, 22, 15, 28]);
    assert.deepEqual(thirdList, [5, 10, 15]);
    thirdList.pop();
    assert.deepEqual(thirdList, [5, 10, 15]);
  });
});

describe('Array#shift', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new array removing the first element without mutating the original', () => {
    const secondList = list.push({ item: 2 }, 1);
    const thirdList = secondList.shift();
    assert.deepEqual(secondList, [{ item: 2 }, 1]);
    assert.deepEqual(thirdList, [1]);
  });
});

describe('Array#unshift', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new array adding an element at the end without mutating the original', () => {
    const anotherList = list.unshift(1);
    assert.deepEqual(anotherList, [1]);
    assert.deepEqual(list, []);
  });

  it('returns a new array adding multiple elements at the end', () => {
    const anotherList = list.unshift(1, 2, 3, 4).unshift(5);
    assert.deepEqual(anotherList, [5, 1, 2, 3, 4]);
  });

  it('returns a new array adding multiple elements of different data types', () => {
    const anotherList = list.unshift({ item: 1 }, [1, 2, 'string'], 'string', null).unshift(true);
    assert.deepEqual(anotherList, [true, { item: 1 }, [1, 2, 'string'], 'string', null]);
  });
});

describe('Array#sort', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new array with alphabetically sorted elments', () => {
    const secondList = list.unshift('b', 'c', 'f', 'a', 'd', 'e');
    const thirdList = secondList.sort();
    assert.deepEqual(secondList, ['b', 'c', 'f', 'a', 'd', 'e']);
    assert.deepEqual(thirdList, ['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('returns a new array with alphabetically sorted numbers', () => {
    const secondList = list.unshift(2, 10, 3, 1, 4);
    const thirdList = secondList.sort();
    assert.deepEqual(secondList, [2, 10, 3, 1, 4]);
    assert.deepEqual(thirdList, [1, 10, 2, 3, 4]);
  });

  it('returns a new array with sorted numbers', () => {
    const secondList = list.unshift(2, 10, 3, 1, 4);
    const thirdList = secondList.sort((a, b) => a > b);
    assert.deepEqual(secondList, [2, 10, 3, 1, 4]);
    assert.deepEqual(thirdList, [1, 2, 3, 4, 10]);
  });
});

describe('Array#concat', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new array with concatenated elements', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.concat(6, 7, 8, 9, 10);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

describe('Array#reverse', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it('returns a new array reversing its elements without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.reverse();
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [5, 4, 3, 2, 1]);
  });
});

describe('Array#copyWithin', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });
  it(' returns a new array copying its elements without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.copyWithin(2, 0);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 1, 2, 3]);
  });
});

describe('Array#splice', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });

  it('returns a new array removing an element without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.splice(2, 1);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 4, 5]);
  });

  it('returns a new array removing and inserting elements without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.splice(2, 1, 1, 2, 3);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 1, 2, 3, 4, 5]);
  });

  it('returns a new array removing and inserting elements without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.splice(2, 1, 1, 2, 3);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 1, 2, 3, 4, 5]);
  });
});

describe('Array#fill', () => {
  let list;
  beforeEach(() => {
    list = Immutables.Array();
  });

  it('returns a new array filled with the given element without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.fill(0);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [0, 0, 0, 0, 0]);
  });

  it('returns a new array filled with the given element specifying start and end without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.fill(0, 2, 3);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 0, 4, 5]);
  });
});
