import { type NextRequest, NextResponse } from "next/server";
import orm from "@src/services/orm";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const playerId = +url.searchParams.get("playerId")!;

  const sql = "SELECT * FROM players WHERE id = ?";

  const data = await orm(sql, [playerId]);

  return NextResponse.json(data[0]);
}
