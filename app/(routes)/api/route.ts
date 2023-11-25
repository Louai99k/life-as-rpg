import fs from "fs";

export async function GET() {
  const blob = fs.readFileSync("./database/data.db");
  const res = new Response(blob);
  const date = new Date().toISOString().replace(":", "-");

  res.headers.set("Content-Disposition", `attachment; filename=${date}.db`);

  return res;
}
