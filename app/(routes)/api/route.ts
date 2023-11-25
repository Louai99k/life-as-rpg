import sqlite3 from "sqlite3";
import { NextResponse } from "next/server";

export async function GET() {
  const dbPath = "./database/data.db";
  const db = new sqlite3.Database(dbPath);

  const query = new Promise((resolve) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
      if (err) resolve({ error: err.message });
      resolve(rows);
    });
  });

  const data = await query;

  db.close();

  return NextResponse.json(data);
}
