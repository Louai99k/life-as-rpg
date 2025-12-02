const { app, BrowserWindow } = require("electron/main");
const path = require("path");
const fs = require("fs");
const setupHandlers = require("./handlers.cjs");

const isPackaged = app.isPackaged;

const basePath = isPackaged
  ? path.join(app.getAppPath(), "electron")
  : __dirname;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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

function setupPrismaForPackagedApp() {
  if (!app.isPackaged) return;

  const resourcesPath = process.resourcesPath;
  const unpackedRoot = path.join(resourcesPath, "node_modules");

  const findEngine = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          const found = findEngine(full);
          if (found) return found;
        } else {
          if (/query-engine|prisma.*\\.node|\\.exe$/.test(e.name)) return full;
        }
      }
    } catch (err) {}
    return null;
  };

  let enginePath = findEngine(unpackedRoot);

  if (enginePath) {
    // set env var for binary-engine
    process.env.PRISMA_QUERY_ENGINE_BINARY = enginePath;
    // if you also need migration or introspection engines, set:
    // process.env.PRISMA_MIGRATION_ENGINE_BINARY = pathToMigrationEngine
    console.log("Prisma engine located at", enginePath);
  } else {
    console.warn(
      "Prisma engine not found in packaged resources — Prisma might fail",
    );
  }
}

app.whenReady().then(() => {
  setupPrismaForPackagedApp();

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
