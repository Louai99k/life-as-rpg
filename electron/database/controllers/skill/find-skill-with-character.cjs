const client = require("../../base-client.cjs");

const findSkillWithCharacter = async (characterUid) => {
  const res = await client.$queryRaw`
SELECT 
  s.*, 
  (
    CASE WHEN cs.uid IS NOT NULL THEN Json_object('uid', cs.uid, 'lvl', cs.lvl) ELSE NULL END
  ) AS character_skill 
FROM 
  skills s 
  LEFT JOIN character_skills AS cs ON cs.skill_ref = s.uid AND cs.character_ref=${characterUid}
`;

  return res.map((item) => ({
    ...item,
    character_skill: JSON.parse(item.character_skill),
  }));
};

module.exports = findSkillWithCharacter;
