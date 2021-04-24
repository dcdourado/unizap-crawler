import prisma from '@prisma/client';
const { PrismaClient } = prisma;

const Client = new PrismaClient();

export default Client;
