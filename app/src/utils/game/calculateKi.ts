const calculateKi = (lvl: number) => {
  if (lvl >= 25) return 1_000_000_000;
  if (lvl === 1) return 100;

  const calculatedKi = Math.pow(2, lvl - 1) * 100;

  return calculatedKi;
};

export default calculateKi;
