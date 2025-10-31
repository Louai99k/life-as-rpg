const missionControllers = require("./mission/index.cjs");
const skillController = require("./skill/index.cjs");

module.exports = {
  ...missionControllers,
  ...skillController,
};
