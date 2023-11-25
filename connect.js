const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const isDirExists = fs.existsSync("./database");

if (!isDirExists) {
  fs.mkdirSync("./database");
}

const db = new sqlite3.Database(
  "./database/data.db",
  sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Error connecting to database");
      return console.error(err.message);
    }
    console.log("Connected Successfully");
  }
);

db.serialize(() => {
  // db.run(
  //   SOME_SQL,
  //   (err) => {
  //     if (err) {
  //       console.error("Error ...");
  //       return console.error(err.message);
  //     }
  //     console.log("Success ...");
  //   }
  // );
});

db.close((err) => {
  if (err) {
    console.error("Error closing the database");
    return console.error(err.message);
  }
  console.log("Closed the database connection.");
});
