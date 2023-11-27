const calculateXP = (level: number) => {
  let xpRequired = 0;
  let baseXP = 100;
  let multiplier = 1.1;

  for (let i = 1; i < level; i++) {
    xpRequired += baseXP;
    baseXP = Math.round(baseXP * multiplier);
  }

  return xpRequired;
};

export default calculateXP;
