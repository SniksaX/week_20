import { prisma } from "../app.js";
import bcrypt from "bcrypt";

const woodsData = [
  {
    name: "Épicéa",
    type: "softwood" as const,
    Hardness: "tender" as const,
  },
  {
    name: "Pin",
    type: "softwood" as const,
    Hardness: "medium_hard" as const,
  },
  {
    name: "Padouk",
    type: "exotic_wood" as const,
    Hardness: "hard" as const,
  },
  {
    name: "Érable",
    type: "noble_and_hardwoods" as const,
    Hardness: "medium_hard" as const,
  },
  {
    name: "Hêtre",
    type: "noble_and_hardwoods" as const,
    Hardness: "medium_hard" as const,
  },
  {
    name: "Itauba",
    type: "exotic_wood" as const,
    Hardness: "hard" as const,
  },
  {
    name: "Douglas",
    type: "softwood" as const,
    Hardness: "tender" as const,
  }
];

async function main() {
  console.log(`Start seeding ...`);

  const hash = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { email: "siraj.dev@gmail.com" },
    update: {},
    create: {
      firstName: "Siraj",
      lastName: "Dev",
      email: "siraj.dev@gmail.com",
      password: hash,
    },
  });
  console.log("User created : siraj.dev@gmail.com");

  for (const wood of woodsData) {
    await prisma.wood.upsert({
      where: { name: wood.name },
      update: {},
      create: {
        name: wood.name,
        type: wood.type as any, 
        hardness: wood.Hardness as any,
      },
    });
    console.log(`Wood Created/Updated : ${wood.name}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });