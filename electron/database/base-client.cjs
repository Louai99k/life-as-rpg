const { PrismaClient } = require("@prisma/client");
const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

const dbName = "data.db";

const packagedDbPath = path.join(app.getPath("userData"), dbName);

// Setup Prisma engine BEFORE creating PrismaClient
if (app.isPackaged) {
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
          // Look for query engine binary
          // Windows: query_engine-windows.dll.node.exe or similar
          // Linux: query_engine-debian-openssl-3.0.x or similar
          if (
            e.name.includes("query_engine") ||
            e.name.includes("query-engine")
          ) {
            // Check if it's an executable (Windows .exe or Linux binary)
            if (
              e.name.endsWith(".exe") || // Windows
              (!e.name.includes(".") && e.name.startsWith("query")) || // Linux binary (no extension)
              e.name.includes("libquery_engine") // Alternative Linux format
            ) {
              console.log("Found potential Prisma engine:", full);
              return full;
            }
          }
        }
      }
    } catch (err) {
      console.error("Error searching for engine:", err);
    }
    return null;
  };

  let enginePath = findEngine(unpackedRoot);

  if (enginePath) {
    process.env.PRISMA_QUERY_ENGINE_BINARY = enginePath;
    console.log("Prisma engine located at", enginePath);
  } else {
    console.warn(
      "Prisma engine not found in packaged resources — Prisma might fail",
    );
  }
}

// Copy database if it doesn't exist
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
