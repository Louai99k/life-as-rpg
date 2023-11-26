import { NextResponse } from "next/server";
import orm from "@src/services/orm";

type Body = {
  sql: string;
  params: any[];
  isSingle?: boolean;
};

export async function POST(req: Request) {
  const body: Body = await req.json();

  const data = await orm(body.sql, body.params || []);

  return NextResponse.json(body.isSingle ? data[0] : data);
}
