import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function orm<T>(sql: string, params: (string | number | boolean)[]) {
  return prisma.$queryRawUnsafe<T[]>(sql, ...params);
}

export default orm;
