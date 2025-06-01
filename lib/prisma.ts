import { PrismaClient } from '@/lib/generated/prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL + '?statement_cache_size=0'
      }
    }
  });
};

export const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Handle cleanup on process termination
if (typeof window === 'undefined') {
  const cleanup = async () => {
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error('Error disconnecting Prisma:', error);
    }
  };

  process.on('beforeExit', cleanup);
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

export default prisma;

export async function disconnect() {
  if (process.env.NODE_ENV === 'production') {
    await prisma.$disconnect();
  }
} 