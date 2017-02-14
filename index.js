import {Array} from './src/immutable-array';

const Immutables = {
    Array: Array
};

if (typeof window !== "undefined") {
  window.Immutables = Immutables;
}