const calculateLvL = (xp: number) => {
  let currentLevel = 1;
  let remainXP = xp;
  let nextLvLRequiredXP = 20;

  while (remainXP >= nextLvLRequiredXP) {
    currentLevel++;
    remainXP -= nextLvLRequiredXP;
    nextLvLRequiredXP = (currentLevel + 1) * 10;
  }

  return currentLevel;
};

export default calculateLvL;
