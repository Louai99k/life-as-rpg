const client = require("./client");

const handleQuery = async (uid, operation, ...args) => {
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

module.exports = handleQuery;
