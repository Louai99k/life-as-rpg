const crypto = require("crypto");

const UID_LENGTH = 5;

const generateUID = () => {
  return crypto.randomBytes(UID_LENGTH).toString("hex").toUpperCase();
};

module.exports = {
  generateUID,
};
