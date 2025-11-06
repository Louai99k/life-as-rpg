import type {
  goals as Goal,
  missions as Mission,
  rewards as Reward,
} from "@prisma/client";

export interface MissionWithRelations extends Mission {
  goals: (Goal & { done: number })[];
  rewards: Reward[];
}
