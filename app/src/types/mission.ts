import type { MISSION_RANK } from "./enum";

export type Goal = {
  description: string;
  completed: boolean;
  uid: string;
};

export type Mission = {
  id: number;
  name: string;
  description: string;
  is_completed: boolean;
  money_reward: number;
  xp_reward: number;
  overall_progress: number;
  goals: Goal[];
  rank: MISSION_RANK;
};
