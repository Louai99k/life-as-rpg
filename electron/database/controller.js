const createMission = require("./controllers/mission/createMission");

const handleController = async (controllerName, ...args) => {
  switch (controllerName) {
    case "createMission":
      return createMission(...args);
  }
};

module.exports = handleController;
