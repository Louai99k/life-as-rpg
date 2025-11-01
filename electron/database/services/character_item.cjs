const client = require("../base-client.cjs");

/**
 * @param {string} itemUid
 * @param {string} characterUid
 * @param {number} qty
 * @return {Promise<any>}
 */
const handlePurchase = async (itemUid, characterUid, qty = 1) => {
  const character = await client.characters.findFirst({
    where: {
      uid: characterUid,
    },
  });

  const item = await client.items.findFirst({
    where: {
      uid: itemUid,
    },
  });

  if (!character || !item) {
    return null;
  }

  const res = await client.characters.update({
    data: {
      money: character.money - item.store_price * qty,
    },
    where: {
      uid: characterUid,
    },
  });

  return res;
};

/**
 * @param {string} characterItemUid
 * @param {number} [qty]
 * @return {Promise<any>}
 */
const handleSell = async (characterItemUid, qty = null) => {
  const characterItem = await client.character_items.findFirst({
    where: {
      uid: characterItemUid,
    },
  });

  if (!characterItem) {
    return null;
  }

  const item = await client.items.findFirst({
    where: {
      uid: characterItem.item_ref,
    },
  });

  const character = await client.characters.findFirst({
    where: {
      uid: characterItem.character_ref,
    },
  });

  if (!item || !character) {
    return null;
  }

  const modificationAmount = qty ? Math.abs(qty - characterItem.qty) : 0;

  const res = await client.characters.update({
    data: {
      money:
        qty === null
          ? character.money + (characterItem.qty * item.store_price) / 2
          : qty > characterItem.qty
            ? character.money - modificationAmount * item.store_price
            : character.money + (modificationAmount * item.store_price) / 2,
    },
    where: {
      uid: characterItem.character_ref,
    },
  });

  return res;
};

module.exports = {
  handlePurchase,
  handleSell,
};
