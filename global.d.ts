import type { PrismaClient } from "@prisma/client";
import type { Models, QueryOperations, MutationOperations } from "types/prisma";

export {};

export interface ElectronAPI {
  db: {
    query: <M extends Models, O extends QueryOperations>(
      model: M,
      operation: O,
      ...args: Parameters<PrismaClient[M][O]>
    ) => ReturnType<PrismaClient[M][O]>;
    mutation: <M extends Models, O extends MutationOperations>(
      model: M,
      operation: O,
      ...args: Parameters<PrismaClient[M][O]>
    ) => ReturnType<PrismaClient[M][O]>;
  };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }

  const electronAPI: Window["electronAPI"];
}
