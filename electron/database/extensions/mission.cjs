const { Prisma } = require("@prisma/client");
const {
  deleteMissionGoals,
  deleteMissionRewards,
  findCharacterMissionsWithRelations,
} = require("../services/mission.cjs");

const missionsExtendedQueries = Prisma.defineExtension({
  name: "missions-extended-queries",
  query: {
    missions: {
      async findMany({ args }) {
        if (!args.where?.character_ref) {
          return [];
        }

        return findCharacterMissionsWithRelations(
          args.where.character_ref,
          args.where.is_completed,
        );
      },

      async delete({ args, query }) {
        const uid = args.where.uid;

        if (!uid) {
          return;
        }

        await deleteMissionGoals(uid);
        await deleteMissionRewards(uid);

        return query(args);
      },
    },
  },
});

module.exports = missionsExtendedQueries;
