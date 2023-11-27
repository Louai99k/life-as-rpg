const calculateLvL = (currentXP: number) => {
  let level = 1;
  let xpRequired = 0;
  let baseXP = 100;
  let multiplier = 1.1;

  while (currentXP >= xpRequired) {
    xpRequired += baseXP;
    baseXP = Math.round(baseXP * multiplier);
    level++;
  }

  return level - 1;
};

export default calculateLvL;
