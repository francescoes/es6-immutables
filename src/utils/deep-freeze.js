// TODO: babel has am issue with Object.values, investigate to avoid this shim
import values from 'object.values';
if (!Object.values) {
  values.shim();
}

export function deepFreeze(element) {
  if (typeof element !== 'object' || element === null || Object.isFrozen(element)) return;
  // handle new structures Map and Set that are typeof function
  Object.freeze(element);
  if (Array.isArray(element)) {
    element.forEach(item => deepFreeze(item));
  } else {
    Object.values(element).forEach(item => deepFreeze(item));
  }
}