const { app, BrowserWindow } = require("electron/main");
const path = require("path");
const setupHandlers = require("./handlers");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "../electron.html"));
};

app.whenReady().then(() => {
  setupHandlers();

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
