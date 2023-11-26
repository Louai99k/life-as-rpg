import { NextResponse } from "next/server";
import orm from "@src/services/orm";

export async function POST(req: Request) {
  const body = await req.json();

  const data = await orm(body.sql, body.params || []);

  return NextResponse.json(data[0]);
}
