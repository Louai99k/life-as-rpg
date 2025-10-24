const createMission = require("./controllers/mission/createMission");
const updateMission = require("./controllers/mission/updateMission");

const handleController = async (controllerName, ...args) => {
  switch (controllerName) {
    case "createMission":
      return createMission(...args);
    case "updateMission":
      return updateMission(...args);
  }
};

module.exports = handleController;
