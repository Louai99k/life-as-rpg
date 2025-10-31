const client = require("./client.cjs");

const handleMutation = async (uid, operation, ...args) => {
  const model = client[uid];

  if (!model) {
    console.warn("no model");
    return;
  }

  const func = model[operation];

  if (typeof func !== "function") {
    console.warn("no operation");
    return;
  }

  const res = await func(...args);

  return res;
};

module.exports = handleMutation;
