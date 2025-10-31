import type {
  skills as Skill,
  character_skills as CharacterSkill,
} from "@prisma/client";

export interface SkillWithCharacterSkill extends Skill {
  character_skill: Pick<CharacterSkill, "uid" | "lvl"> | null;
}

export interface SkillWithCharacterSkill_M extends Skill {
  character_skill: Pick<CharacterSkill, "uid" | "lvl">;
}
