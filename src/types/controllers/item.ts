import type {
  items as Item,
  character_items as CharacterItem,
} from "@prisma/client";

export interface ItemWithCharacterItem extends Item {
  character_item: Pick<CharacterItem, "uid" | "qty"> | null;
}

export interface ItemWithCharacterItem_M extends Item {
  character_item: Pick<CharacterItem, "uid" | "qty">;
}
