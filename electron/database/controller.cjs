const handleController = async (controllerName, ...args) => {
  const controller = require(`./controllers/${controllerName}.cjs`);
  if (typeof controller === "function") {
    return controller(...args);
  }

  return null;
};

module.exports = handleController;
