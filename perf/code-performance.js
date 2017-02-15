require('babel-core/register');
const Immutable = require('immutable');
const Immutables = require('../src/immutable-array.js');
const SImmutable = require('seamless-immutable');

function immutablejs() {
  const list = Immutable.List();
  list.push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
}

function immutables() {
  const list = new Immutables.ImmutableArray();
  list.push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
    .push('string').push('string').push('string').push('string')
}

const testPerformance = (func, name = 'Function#1') => {
  console.time(name);
  func();
  console.timeEnd(name);
}

testPerformance(immutablejs, 'Immutablejs');
testPerformance(immutables, 'es6-immutables');