const isObject = obj => Object(obj) === obj;

const freeze = (object) => {
  object = Object.freeze(object);
  Object.getOwnPropertyNames(object || {}).forEach(name => {
    const property = object[name];
    object[name] = ((Object.isFrozen(property) || !isObject(property)) && property) || freeze(property);
  });
  return object;
};

module.exports = freeze;
