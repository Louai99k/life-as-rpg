const { generateUID } = require("../../utils.cjs");
const {
  createMissionGoals,
  createMissionRewards,
} = require("../../services/mission.cjs");
const client = require("../../base-client.cjs");

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
  await createMissionRewards(mission.uid, payload.rewards);

  return mission;
};

module.exports = createMission;
