const { Prisma } = require("@prisma/client");
const { deleteCharacterMagic } = require("../services/magic.cjs");

const magicExtendedQueries = Prisma.defineExtension({
  name: "magic-extended-queries",
  query: {
    magic: {
      async delete({ args, query }) {
        const uid = args.where.uid;

        if (!uid) {
          return;
        }

        await deleteCharacterMagic(uid);

        return query(args);
      },
    },
  },
});

module.exports = magicExtendedQueries;
