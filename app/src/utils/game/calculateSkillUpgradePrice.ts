const calculateSkillUpgradePrice = (skillLvL: number) => {
  if (skillLvL === 0) {
    return 2000;
  }

  let level = 1;
  let moneyRequired = 2000;

  while (skillLvL > level) {
    let mul;
    switch (true) {
      case level > 20:
        mul = 2;
      default:
        mul = 1.5;
    }
    moneyRequired *= mul;
    level++;
  }

  return moneyRequired;
};

export default calculateSkillUpgradePrice;
