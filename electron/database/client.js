const { PrismaClient } = require("@prisma/client");
const { missionsExtendedQueries, uidExtension } = require("./extensions/index");

const baseClient = new PrismaClient();

/**@type {import('@prisma/client').PrismaClient} */
const client = baseClient
  .$extends(uidExtension)
  .$extends(missionsExtendedQueries);

module.exports = client;
