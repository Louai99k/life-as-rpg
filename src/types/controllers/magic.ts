import type {
  magic as Magic,
  character_magic as CharacterMagic,
} from "@prisma/client";

export interface MagicWithCharacterMagic extends Magic {
  character_magic: Pick<CharacterMagic, "uid" | "lvl"> | null;
}

export interface MagicWithCharacterMagic_M extends Magic {
  character_magic: Pick<CharacterMagic, "uid" | "lvl">;
}
