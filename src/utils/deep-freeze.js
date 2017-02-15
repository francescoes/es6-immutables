// TODO: babel has am issue with Object.values, investigate to avoid this shim
import values from 'object.values';
if (!Object.values) {
  values.shim();
}

export const deepFreeze = (object) => {
  const properties = Object.getOwnPropertyNames(object);
  // Freeze properties before freezing self
  properties.forEach(function(property) {
    const item = object[property]; 
    if (typeof item === 'object' && item !== null && !Object.isFrozen(item)) {
       deepFreeze(item);
    }
  });

  return Object.isFrozen(object) ? object: Object.freeze(object);
}