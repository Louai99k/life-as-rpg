const calculateMagicPrice = (magicLength: number) => {
  return Math.min(Math.pow(2, magicLength - 1) * 15000, 10000000); // the -1 is because the player initially has the time category
};

export default calculateMagicPrice;
