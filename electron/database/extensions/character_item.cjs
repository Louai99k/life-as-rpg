const { Prisma } = require("@prisma/client");
const client = require("../base-client.cjs");
const {
  handlePurchase,
  handleSell,
} = require("../services/character_item.cjs");

const characterItemsExtendedQueries = Prisma.defineExtension({
  name: "character-items-extended-queries",
  query: {
    character_items: {
      async create({ args, query }) {
        const { character_ref, item_ref, qty } = args.data;
        await handlePurchase(item_ref, character_ref, qty);

        return query(args);
      },
      async delete({ args, query }) {
        const { uid } = args.where;
        await handleSell(uid);

        return query(args);
      },
      async update({ args, query }) {
        const { uid } = args.where;
        const { qty } = args.data;
        await handleSell(uid, qty);

        return query(args);
      },
    },
  },
});

module.exports = characterItemsExtendedQueries;
