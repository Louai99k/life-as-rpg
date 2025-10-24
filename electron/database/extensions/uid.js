const { Prisma } = require("@prisma/client");
const { generateUID } = require("../utils");

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
