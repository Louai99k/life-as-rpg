import { type NextRequest, NextResponse } from "next/server";
import orm from "@src/services/orm";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const isMaster = url.searchParams.get("isMaster") === "true";
  const playerId = isMaster ? null : +url.searchParams.get("playerId")!;

  const sql = isMaster
    ? "SELECT * FROM players WHERE is_master=1"
    : "SELECT * FROM players WHERE id = ?";

  const data = isMaster ? await orm(sql, []) : await orm(sql, [playerId]);

  return NextResponse.json(data[0]);
}
