import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsHashing = process.env['ROUNDS_HASHING'];

async function main() {
  const password = await bcrypt.hash('123456', parseInt(roundsHashing));

  const user = await prisma.user.upsert({
    where: { email: 'thyago@email.com' },
    update: { password: password },
    create: {
      name: 'Thyago',
      email: 'thyago@email.com',
      password: password,
    },
  });

  const component = await prisma.component.upsert({
    where: { id: '1ef7a68c-8907-4101-a2e1-c40257e668cc' },
    update: {},
    create: {
      title: 'Component test',
      category: 'Component category',
      description: 'Component description',
      urlThumbnail: 'http://thumbnail.com',
      price: 30.99,
    },
  });

  console.log({ user, component });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
