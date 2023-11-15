import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const roles = [
  { idRol: 1, nameRol: 'ADMIN' },
  { idRol: 2, nameRol: 'EDITOR' },
  { idRol: 3, nameRol: 'USER' },
];

async function main() {
  console.log(`Start seeding ...`);

  const rol1 = await prisma.rol.createMany({
    data: roles,
  });

  const user1 = await prisma.user.create({
    data: {
      restoreToken: await bcrypt.hash('ADMIN1', 10),
      ciNumber: 'V08999245',
      name: 'Jose',
      lastName: 'Monroe',
      email: 'admin@user.com',
      role: {
        connect: {
          idRol: 1,
        },
      },
      password: await bcrypt.hash('1234', 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      restoreToken: await bcrypt.hash('EDITOR1', 10),
      ciNumber: 'V29886239',
      name: 'PEPE',
      lastName: 'JUVENCIO',
      email: 'editor@user.com',
      role: {
        connect: {
          idRol: 2,
        },
      },
      password: await bcrypt.hash('1234', 10),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      ciNumber: 'V29886129',
      restoreToken: await bcrypt.hash('USER1', 10),
      name: 'JOSUE',
      lastName: 'BRITO',
      email: 'user@user.com',
      password: await bcrypt.hash('1234', 10),
    },
  });

  console.log(user1, rol1, user2, user3);
  console.log(`Seeding finished.`);
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
