const { PrismaClient, Prisma } = require("@prisma/client");
const { generateUID } = require("../utils");

const client = new PrismaClient();

/**
 * @param {string} missionUid
 * @return {Promise<any>}
 */
const deleteMissionGoals = async (missionUid) => {
  const missionsGoals = await client.mission_goals.findMany({
    where: {
      mission_ref: missionUid,
    },
  });

  for (const mg of missionsGoals) {
    await client.goals.delete({
      where: {
        uid: mg.goal_ref,
      },
    });
  }

  await client.mission_goals.deleteMany({
    where: {
      mission_ref: missionUid,
    },
  });

  return {
    ok: true,
  };
};

/**
 * @param {string} missionUid
 * @param {import('@prisma/client').goals[]} goals
 * @return {Promise<any>}
 */
const createMissionGoals = async (missionUid, goals) => {
  const createdGoals = [];
  for (const goal of goals) {
    const createdGoal = await client.goals.create({
      data: {
        uid: generateUID(),
        description: goal.description,
      },
    });

    await client.mission_goals.create({
      data: {
        uid: generateUID(),
        mission_ref: missionUid,
        goal_ref: createdGoal.uid,
        done: 0,
      },
    });

    createdGoals.push(createdGoal);
  }

  return createdGoals;
};

/**
 * @typedef Goals
 * @prop {string} uid
 * @prop {string} description
 * @prop {number} done
 * @enddef
 * @param {string} characterUid
 * @param {number} [isCompleted]
 * @return {Promise<(import('@prisma/client').missions & {goals:Goals[]})[]>}
 */
const findCharacterMissionsWithGoals = async (characterUid, isCompleted) => {
  let where = Prisma.sql`m.character_ref = ${characterUid}`;
  if (typeof isCompleted === "number") {
    where = Prisma.sql`m.character_ref = ${characterUid} AND m.is_completed = ${isCompleted}`;
  }

  const rawRes = await client.$queryRaw`
SELECT
    m.*,
    coalesce(
        (
            SELECT json_group_array(
                json_object(
                    'uid', g.uid,
                    'description', g.description,
                    'done', mg.done
                )
            )
            FROM mission_goals mg
            JOIN goals g ON mg.goal_ref=g.uid
            WHERE mg.mission_ref=m.uid
        ),
        '[]'
    ) AS goals
FROM missions m
WHERE ${where}
`;

  const res = rawRes.map((item) => ({
    ...item,
    goals: JSON.parse(item.goals),
  }));

  return res;
};

/**
 * @typedef Goals
 * @prop {string} uid
 * @prop {string} description
 * @prop {number} done
 * @enddef
 * @param {string} missionUid
 * @return {Promise<(import('@prisma/client').missions & {goals:Goals[]}) | null>}
 */
const findMissionWithGoals = async (missionUid) => {
  const rawRes = await client.$queryRaw`
SELECT
    m.*,
    coalesce(
        (
            SELECT json_group_array(
                json_object(
                    'uid', g.uid,
                    'description', g.description,
                    'done', mg.done
                )
            )
            FROM mission_goals mg
            JOIN goals g ON mg.goal_ref=g.uid
            WHERE mg.mission_ref=m.uid
        ),
        '[]'
    ) AS goals
FROM missions m
WHERE m.uid = ${missionUid}
LIMIT 1
`;

  const [res] = rawRes.map((item) => ({
    ...item,
    goals: JSON.parse(item.goals),
  }));

  return res || null;
};

module.exports = {
  deleteMissionGoals,
  createMissionGoals,
  findMissionWithGoals,
  findCharacterMissionsWithGoals,
};
