const { Prisma } = require("@prisma/client");
const { deleteCharacterSkills } = require("../services/skill.cjs");

const skillsExtendedQueries = Prisma.defineExtension({
  name: "skills-extended-queries",
  query: {
    skills: {
      async delete({ args, query }) {
        const uid = args.where.uid;

        if (!uid) {
          return;
        }

        await deleteCharacterSkills(uid);

        return query(args);
      },
    },
  },
});

module.exports = skillsExtendedQueries;
