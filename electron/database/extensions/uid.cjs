const { Prisma } = require("@prisma/client");
const { generateUID } = require("../utils.cjs");

const uidExtension = Prisma.defineExtension({
  name: "uid-middleware",
  query: {
    $allModels: {
      async create({ args, query }) {
        args.data.uid = generateUID();
        return query(args);
      },
    },
  },
});

module.exports = uidExtension;
