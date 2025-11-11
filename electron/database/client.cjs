const baseClient = require("./base-client.cjs");
const {
  missionsExtendedQueries,
  uidExtension,
  skillsExtendedQueries,
  magicExtendedQueries,
  itemsExtendedQueries,
  characterItemsExtendedQueries,
  charactersExtendedQueries,
} = require("./extensions/index.cjs");

/**@type {import('@prisma/client').PrismaClient} */
const client = baseClient
  .$extends(uidExtension)
  .$extends(missionsExtendedQueries)
  .$extends(skillsExtendedQueries)
  .$extends(magicExtendedQueries)
  .$extends(itemsExtendedQueries)
  .$extends(characterItemsExtendedQueries)
  .$extends(charactersExtendedQueries);

module.exports = client;
