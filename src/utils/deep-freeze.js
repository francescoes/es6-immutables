// TODO: babel has am issue with Object.values, investigate to avoid this shim
import values from 'object.values';
if (!Object.values) {
  values.shim();
}

export const deepFreeze = (item) => {
  const freeze = (element) => {
    if (typeof element !== 'object' || element === null || Object.isFrozen(element)) return;
    // handle new structures Map and Set that are typeof function
    Object.freeze(element);
    if (Array.isArray(element)) {
      element.forEach(e => freeze(e));
    } else {
      Object.values(element).forEach(e => freeze(e));
    }
  };
  freeze(item);
  return item;
};