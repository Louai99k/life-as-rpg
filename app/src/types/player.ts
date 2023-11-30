export type PlayerSkill = {
  lvl: number;
};

export type PlayerMagic = {
  category_code: string;
};

export type Player = {
  id: number;
  name: string;
  money: number;
  lvl_points: number;
  xp: number;
  ki: number;
  is_master: boolean;
  lvl: number;
  skills: Record<string, PlayerSkill>;
  magic: PlayerMagic[];
};
