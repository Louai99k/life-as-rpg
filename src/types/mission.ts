import type { goals as Goal, missions as Mission } from "@prisma/client";

export interface MissionWithGoals extends Mission {
  goals: Goal[];
}
