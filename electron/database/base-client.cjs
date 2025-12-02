const { PrismaClient } = require("@prisma/client");
const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

const dbName = "data.db";

const packagedDbPath = path.join(app.getPath("userData"), dbName);

if (app.isPackaged && !fs.existsSync(packagedDbPath)) {
  const templateDbPath = path.join(process.resourcesPath, dbName);

  const templateDb = fs.readFileSync(templateDbPath);

  if (!templateDb) {
    console.error("No sample database exist");
    exit(1);
  }

  try {
    fs.copyFileSync(templateDbPath, packagedDbPath);
  } catch (e) {
    console.error("Failed to copy sample db");
    exit(1);
  }
}

const url = app.isPackaged ? `file:${packagedDbPath}` : `file:./${dbName}`;

const baseClient = new PrismaClient({
  datasources: {
    db: {
      url,
    },
  },
});

module.exports = baseClient;
