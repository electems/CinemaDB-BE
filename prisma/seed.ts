import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seed = async (): Promise<void> => {
  await prisma.user.upsert({
    where: { email: 'alice@cool.org' },
    update: {},
    create: {
      email: `alice@cool.org`,
      firstName: 'Alice',
      lastName: 'Hartmann',
      password: await bcrypt.hash('alice', 11),
    },
  });

  await prisma.user.upsert({
    where: { email: 'bob@cool.org' },
    update: {},
    create: {
      email: `bob@cool.org`,
      firstName: 'Bob',
      lastName: 'Cool',
      password: await bcrypt.hash('bob', 11),
    },
  });

  // eslint-disable-next-line no-console
  console.log('Database seeded');
  process.exit(0);
};
void seed();
