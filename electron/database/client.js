const { PrismaClient, Prisma } = require("@prisma/client");
const crypto = require("crypto");

const UID_LENGTH = 5;

const generateUID = () => {
  return crypto.randomBytes(UID_LENGTH).toString("hex").toUpperCase();
};

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

const customQueriesExtension = Prisma.defineExtension({
  name: "custom-queries",
  query: {
    characters: {
      async create({ args, query }) {
        args.data.character_skills_ref = generateUID();
        args.data.character_magic_ref = generateUID();
        args.data.character_items_ref = generateUID();
        return query(args);
      },
    },
  },
});

const client = baseClient
  .$extends(uidExtension)
  .$extends(customQueriesExtension);

module.exports = client;
