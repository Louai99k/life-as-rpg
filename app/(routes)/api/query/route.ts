import { NextResponse } from "next/server";
import orm from "@src/services/orm";
import dbDataSanitizer from "@src/utils/dbDataSanitizer";

type Body = {
  sql: string;
  params: any[];
  isSingle: boolean;
  jsonFields: string[];
  booleanFields: string[];
};

export async function POST(req: Request) {
  const body: Body = await req.json();

  const data = await orm(body.sql, body.params);

  const sanitizedData = dbDataSanitizer(data, {
    booleanFields: body.booleanFields,
    jsonFields: body.jsonFields,
  });

  return NextResponse.json(body.isSingle ? sanitizedData[0] : sanitizedData);
}
