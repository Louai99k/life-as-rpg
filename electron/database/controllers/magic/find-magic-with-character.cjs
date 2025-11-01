const client = require("../../base-client.cjs");

const findMagicWithCharacter = async (characterUid) => {
  const res = await client.$queryRaw`
SELECT 
  m.*, 
  (
    CASE WHEN cm.uid IS NOT NULL THEN Json_object('uid', cm.uid, 'lvl', cm.lvl) ELSE NULL END
  ) AS character_magic
FROM 
  magic m
  LEFT JOIN character_magic AS cm ON cm.magic_ref = m.uid AND cm.character_ref=${characterUid}
`;

  return res.map((item) => ({
    ...item,
    character_magic: JSON.parse(item.character_magic),
  }));
};

module.exports = findMagicWithCharacter;
