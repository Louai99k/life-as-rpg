const { PrismaClient, Prisma } = require("@prisma/client");
const { deleteMissionGoals } = require("../services/mission");

const baseClient = new PrismaClient();

const missionsExtendedQueries = Prisma.defineExtension({
  name: "missions-extended-queries",
  query: {
    missions: {
      async findMany() {
        const rawRes = await baseClient.$queryRaw`
SELECT
    m.*,
    coalesce(
        (
            SELECT json_group_array(
                json_object(
                    'uid', g.uid,
                    'description', g.description
                )
            )
            FROM mission_goals mg
            JOIN goals g ON mg.goal_ref=g.uid
            WHERE mg.mission_ref=m.uid
        ),
        '[]'
    ) AS goals
FROM missions m
`;

        const res = rawRes.map((item) => ({
          ...item,
          goals: JSON.parse(item.goals),
        }));

        return res;
      },

      async delete({ args, query }) {
        const uid = args.where.uid;

        if (!uid) {
          return;
        }

        await deleteMissionGoals(uid);

        return query(args);
      },
    },
  },
});

module.exports = missionsExtendedQueries;
