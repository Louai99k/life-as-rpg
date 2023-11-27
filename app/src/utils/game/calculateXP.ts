const calculateXP = (level: number) => {
  let xpRequired = 20;

  for (let i = 3; i <= level; i++) {
    xpRequired += i * 10;
  }

  return xpRequired;
};

export default calculateXP;
