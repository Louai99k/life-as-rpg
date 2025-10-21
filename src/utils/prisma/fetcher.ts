import type { PrismaClient } from "@prisma/client";
import type { Models, QueryOperations } from "types/prisma";

function fetchData<M extends Models, O extends QueryOperations>(
  model: M,
  operation: O,
  ...args: Parameters<PrismaClient[M][O]>
) {
  return electronAPI.db.query(model, operation, ...args);
}

export default fetchData;
