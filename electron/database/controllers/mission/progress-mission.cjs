const {
  findMissionWithRelations,
  handleMissionDone,
} = require("../../services/mission.cjs");
const client = require("../../base-client.cjs");

// mark goals as done
// check if all goals in mission is done then mark mission as done and give the rewards to player

const progressMission = async (payload = {}) => {
  const missionWithRelations = await findMissionWithRelations(payload.uid);

  if (!missionWithRelations) {
    return null;
  }

  if (Array.isArray(payload.doneGoals) === false) {
    return null;
  }

  const updatedGoals = [];
  for (const goalUid of payload.doneGoals) {
    const updatedGoal = await client.mission_goals.update({
      where: {
        goal_ref: goalUid,
      },
      data: {
        done: 1,
      },
    });

    updatedGoals.push(updatedGoal);
  }

  const updatedGoalsUid = updatedGoals.map((g) => g.goal_ref);
  const missionGoalsUid = missionWithRelations.goals.map((g) => g.uid);

  const isMissionDone =
    updatedGoalsUid.sort().join(",") === missionGoalsUid.sort().join(",");

  if (isMissionDone) {
    await handleMissionDone(missionWithRelations);
  }

  return {
    ok: true,
  };
};

module.exports = progressMission;
