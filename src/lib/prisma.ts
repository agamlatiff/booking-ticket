import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Enable query logging in development
const prismaClientOptions = {
  log:
    process.env.NODE_ENV === "development"
      ? [
        { emit: "event" as const, level: "query" as const },
        { emit: "stdout" as const, level: "error" as const },
        { emit: "stdout" as const, level: "warn" as const },
      ]
      : [
        { emit: "stdout" as const, level: "error" as const },
      ],
};

const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);

// Log queries in development (optional - uncomment to enable)
// if (process.env.NODE_ENV === "development") {
//   prisma.$on("query" as never, (e: { query: string; duration: number }) => {
//     console.log(`[Query] ${e.query} (${e.duration}ms)`);
//   });
// }

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
