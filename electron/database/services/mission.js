const { PrismaClient } = require("@prisma/client");
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

module.exports = {
  deleteMissionGoals,
  createMissionGoals,
};
