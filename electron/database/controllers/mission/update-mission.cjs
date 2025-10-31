const {
  deleteMissionGoals,
  createMissionGoals,
} = require("../../services/mission.cjs");
const client = require("../../base-client.cjs");

const updateMission = async (payload = {}) => {
  if (Array.isArray(payload.goals)) {
    await deleteMissionGoals(payload.uid);
    await createMissionGoals(payload.uid, payload.goals);
  }

  const updatedMission = await client.missions.update({
    data: {
      title: payload.title,
      description: payload.description,
      xp_reward: payload.xp_reward,
      type: payload.type,
      rank: payload.rank,
    },
    where: {
      uid: payload.uid,
    },
  });

  return updatedMission;
};

module.exports = updateMission;
