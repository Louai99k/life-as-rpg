import type { PrismaClient } from "@prisma/client";
import type { ElectronAPI } from "types/electron";
import type { Models, QueryOperations, MutationOperations } from "types/prisma";

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }

  const electronAPI: Window["electronAPI"];
}

export {};
