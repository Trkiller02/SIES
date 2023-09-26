import { PrismaClient } from '@prisma/client';

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
      ciNumber: 'V08999245',
      name: 'Jose',
      lastName: 'Monroe',
      email: 'jose@gmail.com',
      role: {
        connect: {
          idRol: 1,
        },
      },
      password: '1234',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      ciNumber: 'V29886349',
      name: 'PEPE',
      lastName: 'JUVENCIO',
      email: 'user@gmail.com',
      role: {
        connect: {
          idRol: 2,
        },
      },
      password: '1234',
    },
  });

  console.log(user1, rol1, user2);
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
