import sqlite3 from "sqlite3";
import * as path from "path";
import fs from "fs";

const orm = async (sql: string, params: any[]) => {
  console.log("__dirname: ", path.resolve(__dirname));
  console.log("reading db from orm: ", fs.readFileSync("./database/data.db"));
  const dbPath = "./database/data.db";
  const db = new sqlite3.Database(dbPath);

  const query = new Promise<any[]>((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });

  try {
    const data = await query;
    db.close();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default orm;
