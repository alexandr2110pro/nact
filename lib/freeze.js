const freeze = (object) => {
  object = Object.freeze(object);
  Object.getOwnPropertyNames(object || {}).forEach(name => {
    const property = object[name];
    object[name] = (Object.isFrozen(property) && property) || freeze(property);
  });
  return object;
};

module.exports = freeze;
