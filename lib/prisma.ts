import { PrismaClient } from '@prisma/client';

const isProd = process.env.NODE_ENV === 'production';

const prisma: PrismaClient = isProd
    ? new PrismaClient()
    : !global.prisma
        ? (global.prisma = new PrismaClient())
        : global.prisma;

export default prisma;