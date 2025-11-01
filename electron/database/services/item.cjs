const client = require("../base-client.cjs");

/**
 * @param {string} itemUid
 * @return {Promise<any>}
 */
const deleteCharacterItems = async (itemUid) => {
  await client.character_items.deleteMany({
    where: {
      item_ref: itemUid,
    },
  });

  return {
    ok: true,
  };
};

module.exports = {
  deleteCharacterItems,
};
