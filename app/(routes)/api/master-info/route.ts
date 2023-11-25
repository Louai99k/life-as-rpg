import { NextResponse } from "next/server";
import orm from "@src/services/orm";

export async function GET() {
  const sql = "SELECT * FROM players WHERE is_master=1";

  const data = await orm(sql, []);

  return NextResponse.json(data[0]);
}
