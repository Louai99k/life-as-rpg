const { PrismaClient } = require("@prisma/client");
const { generateUID } = require("../utils");
const { createMissionGoals } = require("../services/mission");

const client = new PrismaClient();

const createMission = async (payload = {}) => {
  const mission = await client.missions.create({
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

  await createMissionGoals(mission.uid, payload.goals);

  return mission;
};

module.exports = createMission;
