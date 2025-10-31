const { ipcMain } = require("electron");
const handleQuery = require("./database/query.cjs");
const handleMutation = require("./database/mutation.cjs");
const handleController = require("./database/controller.cjs");

const setupHandlers = () => {
  ipcMain.handle("db-query", (_event, model, operation, ...args) => {
    return handleQuery(model, operation, ...args);
  });
  ipcMain.handle("db-mutation", (_event, model, operation, ...args) => {
    return handleMutation(model, operation, ...args);
  });
  ipcMain.handle("db-controller", (_event, controllerName, ...args) => {
    return handleController(controllerName, ...args);
  });
};

module.exports = setupHandlers;
