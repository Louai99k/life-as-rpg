const client = require("../base-client.cjs");

/**
 * @param {string} magicUid
 * @return {Promise<any>}
 */
const deleteCharacterMagic = async (magicUid) => {
  await client.character_magic.deleteMany({
    where: {
      magic_ref: magicUid,
    },
  });

  return {
    ok: true,
  };
};

module.exports = {
  deleteCharacterMagic,
};
