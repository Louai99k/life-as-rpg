const { PrismaClient } = require("@prisma/client");

const baseClient = new PrismaClient();

module.exports = baseClient;
