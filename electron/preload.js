const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  db: {
    query: (...args) => ipcRenderer.invoke("db-query", ...args),
    mutation: (...args) => ipcRenderer.invoke("db-mutation", ...args),
  },
});
