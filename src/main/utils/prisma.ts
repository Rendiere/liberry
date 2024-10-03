import { PrismaClient } from '@prisma/client'

declare global {
  // Prevent multiple instances of Prisma Client in development
  // This is necessary because Electron's main process may reload
  // and re-initialize the Prisma Client.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma