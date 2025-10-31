const { findMissionWithGoals } = require("../../services/mission.cjs");
const client = require("../../base-client.cjs");

// mark goals as done
// check if all goals in mission is done then mark mission as done and give the rewards to player

const progressMission = async (payload = {}) => {
  const missionWithGoals = await findMissionWithGoals(payload.uid);

  if (!missionWithGoals) {
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
  const missionGoalsUid = missionWithGoals.goals.map((g) => g.uid);

  const isMissionDone =
    updatedGoalsUid.sort().join(",") === missionGoalsUid.sort().join(",");

  if (isMissionDone) {
    const updatedMission = await client.missions.update({
      where: {
        uid: payload.uid,
      },
      data: {
        is_completed: 1,
      },
    });

    await client.$queryRaw`
UPDATE characters
SET xp = xp + ${missionWithGoals.xp_reward}
WHERE characters.uid = ${missionWithGoals.character_ref}
`;

    // handle rewards

    return updatedMission;
  }

  return {
    ok: true,
  };
};

module.exports = progressMission;
