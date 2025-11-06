import type { rewards as Reward } from "@prisma/client";

export interface CreateMissionControllerPayload {
  description: string;
  title: string;
  rank: string;
  character_ref: string;
  type: string;
  goals: { description: string; uid?: string }[];
  xp_reward: number;
  rewards: Reward[];
}

export interface UpdateMissionControllerPayload {
  description?: string;
  title?: string;
  rank?: string;
  type?: string;
  goals?: { description: string; uid: string }[];
  xp_reward?: number;
  rewards?: Reward[];
  uid: string;
}

export interface ProgressMissionControllerPayload {
  uid: string;
  doneGoals: string[];
}
