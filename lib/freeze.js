const freeze = (object) => {
  object = Object.freeze(object);
  Object.getOwnPropertyNames(object || {}).forEach(name => {
    const property = object[name];
    if (!Object.isFrozen(property)) { freeze(property); }
  });
  return object;
};

module.exports = freeze;
