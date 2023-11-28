import sqlite3 from "sqlite3";

const orm = async (sql: string, params: any[]) => {
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
    console.log("sucess getting data from orm");
    db.close();
    return data;
  } catch (e) {
    console.log("error getting data from orm");
    console.error(e);
    return [];
  }
};

export default orm;
