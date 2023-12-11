import type { Player } from "@src/types/player";

const calculateMagicPrice = (player: Player) => {
  return Math.min(Math.pow(2, player.magic.length - 1) * 15000, 10000000); // the -1 is because the player initially has the time category
};

export default calculateMagicPrice;
