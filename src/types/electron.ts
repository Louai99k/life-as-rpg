import type { missions as Mission, PrismaClient } from "@prisma/client";
import type { Models, QueryOperations, MutationOperations } from "types/prisma";
import type {
  CreateMissionControllerPayload,
  ProgressMissionControllerPayload,
  UpdateMissionControllerPayload,
} from "./controllers/mission";
import type { SkillWithCharacterSkill } from "./controllers/skill";
import type { MagicWithCharacterMagic } from "./controllers/magic";
import type { ItemWithCharacterItem } from "./controllers/item";

export type Controller =
  | "createMission"
  | "updateMission"
  | "progressMission"
  | "findSkillWithCharacter"
  | "findMagicWithCharacter"
  | "findItemWithCharacter";

export interface ControllerPayloadMap extends Record<Controller, any[]> {
  createMission: [CreateMissionControllerPayload];
  updateMission: [UpdateMissionControllerPayload];
  progressMission: [ProgressMissionControllerPayload];
  findSkillWithCharacter: [string];
  findMagicWithCharacter: [string];
  findItemWithCharacter: [string];
}

export interface ControllerReturnMap extends Record<Controller, any> {
  createMission: Mission;
  updateMission: Mission;
  progressMission: Mission;
  findSkillWithCharacter: SkillWithCharacterSkill[];
  findMagicWithCharacter: MagicWithCharacterMagic[];
  findItemWithCharacter: ItemWithCharacterItem[];
}

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
    controller: <K extends Controller>(
      controllerName: K,
      ...args: ControllerPayloadMap[K]
    ) => Promise<ControllerReturnMap[K]>;
  };
}
