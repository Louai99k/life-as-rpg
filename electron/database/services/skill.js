const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

/**
 * @param {string} skillUid
 * @return {Promise<any>}
 */
const deleteCharacterSkills = async (skillUid) => {
  await client.character_skills.deleteMany({
    where: {
      skill_ref: skillUid,
    },
  });

  return {
    ok: true,
  };
};

module.exports = {
  deleteCharacterSkills,
};
