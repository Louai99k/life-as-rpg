export const REWARD_TYPES = {
  MONEY: "money",
  ITEM: "item",
  MAGIC: "magic",
  SKILL: "skill",
  LVL_POINTS: "lvl_points",
} as const;

export type REWARD_TYPE = (typeof REWARD_TYPES)[keyof typeof REWARD_TYPES] &
  (string & {});
