const missionControllers = require("./mission/index.cjs");
const skillController = require("./skill/index.cjs");
const magicController = require("./magic/index.cjs");
const itemController = require("./item/index.cjs");

module.exports = {
  ...missionControllers,
  ...skillController,
  ...magicController,
  ...itemController,
};
