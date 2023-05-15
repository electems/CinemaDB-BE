import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seed = async (): Promise<void> => {
  await prisma.user.upsert({
    where: { email: 'alice@cool.org' },
    update: {},
    create: {
      userName: 'alicecool',
      email: `alice@cool.org`,
      firstName: 'Alice',
      lastName: 'Hartmann',
      filmIndustry: 'sandalhood',
      status: 'ACTIVE',
      role: 'USER',
      password: await bcrypt.hash('alice', 11),
    },
  });

  await prisma.user.upsert({
    where: { email: 'shiva@electems.com' },
    update: {},
    create: {
      userName: 'admin',
      email: `shiva@electems.com`,
      firstName: 'Super',
      lastName: 'Admin',
      filmIndustry: 'sandalhood',
      status: 'ACTIVE',
      role: 'ADMIN',
      password: await bcrypt.hash('admin', 11),
    },
  });
  await prisma.user.upsert({
    where: { email: 'penman@electems.com' },
    update: {},
    create: {
      userName: 'penman',
      email: `penman@electems.com`,
      firstName: 'penman',
      lastName: 'penman',
      status: 'ACTIVE',
      role: 'PENMAN',
      password: await bcrypt.hash('penman', 11),
    },
  });

  // eslint-disable-next-line no-console
  console.log('Database seeded');
  process.exit(0);
};
void seed();
