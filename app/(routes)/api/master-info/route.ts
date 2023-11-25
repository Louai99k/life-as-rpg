import { NextResponse } from "next/server";
import orm from "@src/services/orm";

export async function GET() {
  const sql = "SELECT * FROM players WHERE is_master = ?";

  const data = await orm(sql, [1]);

  return NextResponse.json(data[0]);
}
