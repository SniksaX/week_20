import { prisma } from "../app.js";

const woodsData = [
  {
    name: "Épicéa",
    type: "softwood" as const,
    hardness: "tender" as const,
  },
  {
    name: "Pin",
    type: "softwood" as const,
    hardness: "medium_hard" as const,
  },
  {
    name: "Padouk",
    type: "exotic_wood" as const,
    hardness: "hard" as const,
  },
  {
    name: "Érable",
    type: "noble_and_hardwoods" as const,
    hardness: "medium_hard" as const,
  },
  {
    name: "Hêtre",
    type: "noble_and_hardwoods" as const,
    hardness: "medium_hard" as const,
  },
  {
    name: "Itauba",
    type: "exotic_wood" as const,
    hardness: "hard" as const,
  },
  {
    name: "Douglas",
    type: "softwood" as const,
    hardness: "tender" as const,
  }
];

async function main() {

  const testUser = await prisma.user.upsert({
    where: { email: "siraj.dev@gmail.com" },
    update: {},
    create: {
      firstName: "Siraj",
      lastName: "Dev",
      email: "siraj.dev@gmail.com",
      password: '1234'
    },
  });
  console.log(`User created : ${testUser.email}`);

  for (const wood of woodsData) {
    const createdWood = await prisma.wood.upsert({
      where: { name: wood.name },
      update: {},
      create: wood,
    });
    console.log(`Wood Created/Updated : ${createdWood.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});