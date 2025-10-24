const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();
const { generateUID } = require("../../utils");

const createMission = async (payload = {}) => {
  return client.$transaction(async (trx) => {
    const goals = [];
    for (const goal of payload.goals) {
      const createdGoal = await trx.goals.create({
        data: {
          uid: generateUID(),
          description: goal.description,
        },
      });

      goals.push(createdGoal);
    }

    const mission = await trx.missions.create({
      data: {
        uid: generateUID(),
        title: payload.title,
        description: payload.description,
        xp_reward: payload.xp_reward,
        is_completed: 0,
        type: payload.type,
        rank: payload.rank,
        character_ref: payload.character_ref,
      },
    });

    for (const goal of goals) {
      await trx.mission_goals.create({
        data: {
          uid: generateUID(),
          mission_ref: mission.uid,
          goal_ref: goal.uid,
          done: 0,
        },
      });
    }

    return mission;
  });
};

module.exports = createMission;
