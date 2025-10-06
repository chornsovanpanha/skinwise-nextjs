// import { PrismaClient } from "@prisma/client";

// const prismaClient = new PrismaClient();

// export default prismaClient;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

async function connectWithRetry(
  prisma: PrismaClient,
  retries = 5,
  delay = 2000
): Promise<void> {
  while (retries > 0) {
    try {
      await prisma.$connect();
      console.log("Connected to Neon database");
      return;
    } catch (err) {
      console.error(
        `Database connection failed. Retrying (${6 - retries}/5)...`,
        err
      );
      retries -= 1;
      if (retries === 0) throw new Error("Could not connect to Neon DB");
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

// Keep the connection open across hot reloads in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Try to connect immediately with retry logic
connectWithRetry(prisma).catch((err) =>
  console.error("🔥 Prisma connection failed permanently:", err)
);

export default prisma;
