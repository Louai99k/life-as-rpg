export interface CreateMissionControllerPayload {
  description: string;
  title: string;
  rank: string;
  character_ref: string;
  type: string;
  goals: { description: string; uid?: string }[];
  xp_reward: number;
}
