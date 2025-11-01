const { PrismaClient } = require("@prisma/client");
const {
  missionsExtendedQueries,
  uidExtension,
  skillsExtendedQueries,
  magicExtendedQueries,
  itemsExtendedQueries,
  characterItemsExtendedQueries,
} = require("./extensions/index.cjs");

const baseClient = new PrismaClient();

/**@type {import('@prisma/client').PrismaClient} */
const client = baseClient
  .$extends(uidExtension)
  .$extends(missionsExtendedQueries)
  .$extends(skillsExtendedQueries)
  .$extends(magicExtendedQueries)
  .$extends(itemsExtendedQueries)
  .$extends(characterItemsExtendedQueries);

module.exports = client;
