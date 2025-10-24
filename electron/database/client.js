const { PrismaClient, Prisma } = require("@prisma/client");
const { generateUID } = require("./utils");

const baseClient = new PrismaClient();

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

/**@type {import('@prisma/client').PrismaClient} */
const client = baseClient.$extends(uidExtension);

module.exports = client;
