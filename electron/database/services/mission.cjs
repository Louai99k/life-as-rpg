const { Prisma } = require("@prisma/client");
const { generateUID } = require("../utils.cjs");
const client = require("../base-client.cjs");

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
 * @param {string} missionUid
 * @param {import('@prisma/client').rewards[]} rewards
 * @return {Promise<any>}
 */
const createMissionRewards = async (missionUid, rewards) => {
  const createdRewards = [];
  for (const reward of rewards) {
    const createdReward = await client.rewards.create({
      data: {
        uid: generateUID(),
        description: reward.description || "",
        reward_type: reward.reward_type,
        reward_amount: reward.reward_amount || 0,
        reward_lvl: reward.reward_lvl || 0,
        reward_uid: reward.reward_uid || "",
      },
    });

    await client.mission_rewards.create({
      data: {
        uid: generateUID(),
        mission_ref: missionUid,
        reward_ref: createdReward.uid,
      },
    });

    createdRewards.push(createdReward);
  }

  return createdRewards;
};

/**
 * @param {string} missionUid
 * @return {Promise<any>}
 */
const deleteMissionRewards = async (missionUid) => {
  const missionsRewards = await client.mission_rewards.findMany({
    where: {
      mission_ref: missionUid,
    },
  });

  for (const mr of missionsRewards) {
    await client.rewards.delete({
      where: {
        uid: mr.reward_ref,
      },
    });
  }

  await client.mission_rewards.deleteMany({
    where: {
      mission_ref: missionUid,
    },
  });

  return {
    ok: true,
  };
};

/**
 * @typedef Goals
 * @prop {string} uid
 * @prop {string} description
 * @prop {number} done
 * @enddef
 * @typedef {import('@prisma/client').rewards} Reward
 * @enddef
 * @param {string} characterUid
 * @param {number} [isCompleted]
 * @return {Promise<(import('@prisma/client').missions & {goals:Goals[];rewards:Reward[]})[]>}
 */
const findCharacterMissionsWithRelations = async (
  characterUid,
  isCompleted,
) => {
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
    ) AS goals,
    coalesce(
        (
            SELECT json_group_array(
                json_object(
                    'uid', r.uid,
                    'description', r.description,
                    'reward_type', r.reward_type,
                    'reward_amount', r.reward_amount,
                    'reward_uid', r.reward_uid,
                    'reward_lvl', r.reward_lvl
                )
            )
            FROM mission_rewards mr
            JOIN rewards r ON mr.reward_ref=r.uid
            WHERE mr.mission_ref=m.uid
        ),
        '[]'
    ) AS rewards
FROM missions m
WHERE ${where}
`;

  const res = rawRes.map((item) => ({
    ...item,
    goals: JSON.parse(item.goals),
    rewards: JSON.parse(item.rewards),
  }));

  return res;
};

/**
 * @typedef Goals
 * @prop {string} uid
 * @prop {string} description
 * @prop {number} done
 * @enddef
 * @typedef {import('@prisma/client').rewards} Reward
 * @enddef
 * @typedef {import('@prisma/client').missions & {goals:Goals[];rewards:Reward[]}} MissionWithRelations
 * @enddef
 * @param {string} missionUid
 * @return {Promise<MissionWithRelations | null>}
 */
const findMissionWithRelations = async (missionUid) => {
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
    ) AS goals,
    coalesce(
        (
            SELECT json_group_array(
                json_object(
                    'uid', r.uid,
                    'description', r.description,
                    'reward_type', r.reward_type,
                    'reward_amount', r.reward_amount,
                    'reward_uid', r.reward_uid,
                    'reward_lvl', r.reward_lvl
                )
            )
            FROM mission_rewards mr
            JOIN rewards r ON mr.reward_ref=r.uid
            WHERE mr.mission_ref=m.uid
        ),
        '[]'
    ) AS rewards
FROM missions m
WHERE m.uid = ${missionUid}
LIMIT 1
`;

  const [res] = rawRes.map((item) => ({
    ...item,
    goals: JSON.parse(item.goals),
    rewards: JSON.parse(item.rewards),
  }));

  return res || null;
};

/**
 * @param {MissionWithRelations} missionWithRelations
 * @return {Promise<any>}
 */
const handleMissionDone = async (missionWithRelations) => {
  const updatedMission = await client.missions.update({
    where: {
      uid: missionWithRelations.uid,
    },
    data: {
      is_completed: 1,
    },
  });

  await client.$queryRaw`
UPDATE characters
SET xp = xp + ${missionWithRelations.xp_reward}
WHERE characters.uid = ${missionWithRelations.character_ref}
`;

  for (const reward of missionWithRelations.rewards) {
    switch (reward.reward_type) {
      case "money":
        {
          await client.$queryRaw`
UPDATE characters
SET money = money + ${reward.reward_amount}
WHERE characters.uid = ${missionWithRelations.character_ref}
`;
        }
        break;
      case "item":
        {
          const characterItem = await client.character_items.findFirst({
            where: {
              character_ref: missionWithRelations.character_ref,
              item_ref: reward.reward_uid,
            },
          });

          if (characterItem) {
            await client.character_items.update({
              data: {
                qty: characterItem.qty + reward.reward_amount,
              },
              where: {
                uid: characterItem.uid,
              },
            });
          } else {
            await client.character_items.create({
              data: {
                uid: generateUID(),
                qty: reward.reward_amount,
                character_ref: missionWithRelations.character_ref,
                item_ref: reward.reward_uid,
              },
            });
          }
        }
        break;
      case "magic":
        {
          const characterMagic = await client.character_magic.findFirst({
            where: {
              character_ref: missionWithRelations.character_ref,
              magic_ref: reward.reward_uid,
            },
          });

          if (characterMagic) {
            console.log(
              `Magic [${characterMagic.magic_ref}] already exist on character [${missionWithRelations.character_ref}]`,
            );
          } else {
            await client.character_magic.create({
              data: {
                uid: generateUID(),
                lvl: reward.reward_lvl,
                character_ref: missionWithRelations.character_ref,
                magic_ref: reward.reward_uid,
              },
            });
          }
        }
        break;
      case "skill":
        {
          const characterSkill = await client.character_skills.findFirst({
            where: {
              character_ref: missionWithRelations.character_ref,
              skill_ref: reward.reward_uid,
            },
          });

          if (characterSkill) {
            console.log(
              `Skill [${characterSkill.skill_ref}] already exist on character [${missionWithRelations.character_ref}]`,
            );
          } else {
            await client.character_skills.create({
              data: {
                uid: generateUID(),
                lvl: reward.reward_lvl,
                character_ref: missionWithRelations.character_ref,
                skill_ref: reward.reward_uid,
              },
            });
          }
        }
        break;
    }
  }

  return updatedMission;
};

module.exports = {
  createMissionGoals,
  deleteMissionGoals,
  createMissionRewards,
  deleteMissionRewards,
  findMissionWithRelations,
  findCharacterMissionsWithRelations,
  handleMissionDone,
};
