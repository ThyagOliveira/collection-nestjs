import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "normal@email.com" },
    update: {},
    create: {
      name: "Thyago",
      email: "normal@email.com",
      password: "123123"
    },
  });
  
  const component = await prisma.component.upsert({
    where: { id: "1ef7a68c-8907-4101-a2e1-c40257e668cc"},
    update: {},
    create: {
      title: "Component test",
      category: "Component",
      description: "Component description",
      urlThumbnail: "http://thumbnail.com",
      price: 30.99,
    },
  });

  console.log( { user, component} )
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
