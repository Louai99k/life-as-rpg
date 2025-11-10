const { Prisma } = require("@prisma/client");
const client = require("../base-client.cjs");
const {
  deleteMissionGoals,
  deleteMissionRewards,
} = require("../services/mission.cjs");

const characterExtendedQueries = Prisma.defineExtension({
  name: "character-extended-queries",
  query: {
    characters: {
      async delete({ args, query }) {
        return client.$transaction(async (trx) => {
          await trx.character_items.deleteMany({
            where: { character_ref: args.where.uid },
          });
          await trx.character_skills.deleteMany({
            where: { character_ref: args.where.uid },
          });
          await trx.character_magic.deleteMany({
            where: { character_ref: args.where.uid },
          });

          const missions = await trx.missions.findMany({
            where: {
              character_ref: args.where.uid,
            },
          });

          for (const m of missions) {
            const missionsGoals = await trx.mission_goals.findMany({
              where: {
                mission_ref: m.uid,
              },
            });

            for (const mg of missionsGoals) {
              await trx.goals.delete({
                where: {
                  uid: mg.goal_ref,
                },
              });
            }

            await trx.mission_goals.deleteMany({
              where: {
                mission_ref: m.uid,
              },
            });

            const missionsRewards = await trx.mission_rewards.findMany({
              where: {
                mission_ref: m.uid,
              },
            });

            for (const mr of missionsRewards) {
              await trx.rewards.delete({
                where: {
                  uid: mr.reward_ref,
                },
              });
            }

            await trx.mission_rewards.deleteMany({
              where: {
                mission_ref: m.uid,
              },
            });

            await trx.missions.delete({
              where: {
                uid: m.uid,
              },
            });
          }

          return trx.characters.delete({
            where: args.where,
          });
        });
      },
    },
  },
});

module.exports = characterExtendedQueries;
