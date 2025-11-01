const { Prisma } = require("@prisma/client");
const { deleteCharacterItems } = require("../services/item.cjs");

const itemsExtendedQueries = Prisma.defineExtension({
  name: "items-extended-queries",
  query: {
    items: {
      async delete({ args, query }) {
        const uid = args.where.uid;

        if (!uid) {
          return;
        }

        await deleteCharacterItems(uid);

        return query(args);
      },
    },
  },
});

module.exports = itemsExtendedQueries;
