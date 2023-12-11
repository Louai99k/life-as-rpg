import type { Player } from "@src/types/player";

const calculateMagicPrice = (player: Player) => {
  return Math.min(Math.pow(2, player.magic.length - 1) * 15000, 10000000);
};

export default calculateMagicPrice;
