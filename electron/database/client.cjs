const { PrismaClient } = require("@prisma/client");
const {
  missionsExtendedQueries,
  uidExtension,
  skillsExtendedQueries,
} = require("./extensions/index.cjs");

const baseClient = new PrismaClient();

/**@type {import('@prisma/client').PrismaClient} */
const client = baseClient
  .$extends(uidExtension)
  .$extends(missionsExtendedQueries)
  .$extends(skillsExtendedQueries);

module.exports = client;
