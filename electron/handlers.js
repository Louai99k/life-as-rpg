const { ipcMain } = require("electron");
const handleQuery = require("./database/query");

const setupHandlers = () => {
  ipcMain.handle("db-query", (_event, model, operation, ...args) => {
    return handleQuery(model, operation, ...args);
  });
  ipcMain.handle("db-mutation", (_event, model, operation, ...args) => {
    return handleQuery(model, operation, ...args);
  });
};

module.exports = setupHandlers;
