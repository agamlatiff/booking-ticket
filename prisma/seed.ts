import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const password = bcrypt.hashSync("admin123", 10);

  const userSeed = await prisma.user.create({
    data: {
      email: "admin@email.com",
      name: "ADMIN",
      role: "ADMIN",
      password,
    },
  });
  console.log("User seeded:", userSeed);
}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })