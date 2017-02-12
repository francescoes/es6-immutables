import assert from 'assert';
import {ImmutableArray} from '../src/immutable-array'; 

describe('Array', () => {
  let list;
  beforeEach(() => {
    list = new ImmutableArray();
  });

  // CONSTRUCTOR
  it('constructor: creates an immutable array', () => {
    const list = new ImmutableArray([1, 2, { item: 2 }, []]);
    list[0] = 1;
    list[2].anotherItem = 1;
    list[2].item = 0;
    list[3].push(1);
    assert.deepEqual(list, [1, 2, { item: 2 }, []]);
  });

  // PUSH
  it('push: returns a new array adding an element at the end without mutating the original', () => {
    const anotherList = list.push(1);
    assert.deepEqual(anotherList, [1]);
    assert.deepEqual(list, []);
  });

  it('push: returns a new array adding multiple elements at the end', () => {
    const anotherList = list.push(1, 2, 3, 4).push(5);
    assert.deepEqual(anotherList, [1, 2, 3, 4, 5]);
  });

  it('push: returns a new array adding multiple elements of different data types', () => {
    const anotherList = list.push({ item: 1 }, [1, 2, 'string'], 'string', null).push(true);
    assert.deepEqual(anotherList, [{ item: 1}, [1, 2, 'string'], 'string', null, true]);
  });

  // POP
  it('pop: returns a new array removing the last element without mutating the original', () => {
    const secondList = list.push({ item: 2 });
    const thirdList = secondList.pop();
    assert.deepEqual(secondList, [ { item: 2 } ]);
    assert.deepEqual(thirdList, []);
  });

  // MAP
  it('map: returns a new array immutable array of pow elements', () => {
    const secondList = list.push(1, 2, 3, 4);
    const thirdList = secondList.map(x => x*x);
    assert.deepEqual(thirdList, [1, 4, 9, 16]);
    thirdList.pop();
    assert.deepEqual(thirdList, [1, 4, 9, 16]);
  });

  // FILTER
  it('filter: returns a new array immutable array of filterd elements', () => {
    const secondList = list.push(1, 5, 10, 22, 15, 28);
    const thirdList = secondList.filter(x => x%5 === 0);
    assert.deepEqual(secondList, [1, 5, 10, 22, 15, 28]);
    assert.deepEqual(thirdList, [5, 10, 15]);
    thirdList.pop();
    assert.deepEqual(thirdList, [5, 10, 15]);
  });

  // SHIFT
  it('shift: returns a new array removing the first element without mutating the original', () => {
    const secondList = list.push({ item: 2 }, 1);
    const thirdList = secondList.shift();
    assert.deepEqual(secondList, [{ item: 2 }, 1]);
    assert.deepEqual(thirdList, [1]);
  });

  // UNSHIFT
  it('unshift: returns a new array adding an element at the end without mutating the original', () => {
    const anotherList = list.unshift(1);
    assert.deepEqual(anotherList, [1]);
    assert.deepEqual(list, []);
  });

  it('unshift: returns a new array adding multiple elements at the end', () => {
    const anotherList = list.unshift(1, 2, 3, 4).unshift(5);
    assert.deepEqual(anotherList, [5, 1, 2, 3, 4]);
  });

  it('unshift: returns a new array adding multiple elements of different data types', () => {
    const anotherList = list.unshift({ item: 1 }, [1, 2, 'string'], 'string', null).unshift(true);
    assert.deepEqual(anotherList, [true, { item: 1 }, [1, 2, 'string'], 'string', null]);
  });

  // SORT
  it('sort: returns a new array with alphabetically sorted elments', () => {
    const secondList = list.unshift('b', 'c', 'f', 'a', 'd', 'e');
    const thirdList = secondList.sort();
    assert.deepEqual(secondList, ['b', 'c', 'f', 'a', 'd', 'e']);
    assert.deepEqual(thirdList, ['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('sort: returns a new array with alphabetically sorted numbers', () => {
    const secondList = list.unshift(2, 10, 3, 1, 4);
    const thirdList = secondList.sort();
    assert.deepEqual(secondList, [2, 10, 3, 1, 4]);
    assert.deepEqual(thirdList, [1, 10, 2, 3, 4]);
  });

  it('sort: returns a new array with sorted numbers', () => {
    const secondList = list.unshift(2, 10, 3, 1, 4);
    const thirdList = secondList.sort((a,b) => a > b);
    assert.deepEqual(secondList, [2, 10, 3, 1, 4]);
    assert.deepEqual(thirdList, [1, 2, 3, 4, 10]);
  });
  
  // CONCAT
  it('concat: returns a new array with concatenated elements', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.concat(6, 7, 8, 9, 10);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  // REVERSE
  it('reverse: returns a new array reversing its elements without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.reverse();
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [5, 4, 3, 2, 1]);
  });

  // COPYWITHIN
  it('copyWithin: returns a new array copying its elements without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.copyWithin(2, 0);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 1, 2, 3]);
  });

  // SPLICE
  it('splice: returns a new array removing an element without mutating the original array', () => {
    const secondList = list.push(1, 2, 3, 4, 5);
    const thirdList = secondList.splice(2, 1);
    assert.deepEqual(secondList, [1, 2, 3, 4, 5]);
    assert.deepEqual(thirdList, [1, 2, 4, 5]);
  });
});
