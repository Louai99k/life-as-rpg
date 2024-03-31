import calculateXP from "./calculateXP";

const calculateLvL = (xp: number, currentLevel = 1) => {
  let newLvL = currentLevel;
  let remainXP = xp;
  let nextLvLRequiredXP = calculateXP(currentLevel + 1);

  while (remainXP >= nextLvLRequiredXP) {
    newLvL++;
    remainXP -= nextLvLRequiredXP;
    nextLvLRequiredXP = calculateXP(newLvL + 1);
  }

  return {
    remainXP,
    newLvL,
  };
};

export default calculateLvL;
