const { app, BrowserWindow } = require("electron/main");
const path = require("path");
const setupHandlers = require("./handlers.cjs");

const isPackaged = app.isPackaged;

const basePath = isPackaged
  ? path.join(app.getAppPath(), "electron")
  : __dirname;

const createWindow = () => {
  const win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(basePath, "preload.cjs"),
    },
  });

  if (isPackaged) {
    const filePath = path.join(basePath, "..", "dist-vite/index.html");
    win.loadFile(filePath);
  } else {
    win.loadURL("http://localhost:5173");
  }
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
