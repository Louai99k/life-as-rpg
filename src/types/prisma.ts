import type { PrismaClient, Prisma } from "@prisma/client";

export type Models = Prisma.ModelName;

export type Operations = keyof PrismaClient[Models];

export type QueryOperations = Extract<
  Operations,
  | "findUnique"
  | "findUniqueOrThrow"
  | "findFirst"
  | "findFirstOrThrow"
  | "findMany"
>;

export type MutationOperations = Extract<
  Operations,
  | "create"
  | "createMany"
  | "createManyAndReturn"
  | "delete"
  | "update"
  | "deleteMany"
  | "updateMany"
  | "updateManyAndReturn"
>;

export type FuncExtractor<
  M extends Models,
  O extends Operations,
> = PrismaClient[M][O];
