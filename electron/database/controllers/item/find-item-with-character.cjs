const client = require("../../base-client.cjs");

const findItemWithCharacter = async (characterUid) => {
  const res = await client.$queryRaw`
SELECT 
  i.*, 
  (
    CASE WHEN ci.uid IS NOT NULL THEN Json_object('uid', ci.uid, 'qty', ci.qty) ELSE NULL END
  ) AS character_item
FROM 
  items i 
  LEFT JOIN character_items AS ci ON ci.item_ref = i.uid AND ci.character_ref=${characterUid}
`;

  return res.map((item) => ({
    ...item,
    character_item: JSON.parse(item.character_item),
  }));
};

module.exports = findItemWithCharacter;
