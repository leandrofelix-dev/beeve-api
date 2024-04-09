import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const roleAdmin = await prisma.role.create({
    data: {
      name: 'Admin',
      description: 'Função de administrador',
    },
  })

  const roleUser = await prisma.role.create({
    data: {
      name: 'Usuário',
      description: 'Função de usuário regular',
    },
  })

  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@example.com',
      passwordHash: 'hashedPassword',
      isExternal: false,
      roleId: roleAdmin.id,
    },
  })

  const regularUser = await prisma.user.create({
    data: {
      fullName: 'Regular User',
      email: 'user@example.com',
      passwordHash: 'hashedPassword',
      isExternal: false,
      roleId: roleUser.id,
    },
  })

  const event1 = await prisma.event.create({
    data: {
      eventCode: 'EVT001',
      name: 'Workshop de Desenvolvimento Web',
      idCreator: adminUser.id,
      description: 'Participe do nosso workshop sobre desenvolvimento web.',
      startDateTime: new Date(),
      endDateTime: new Date(),
      isRemote: false,
      isPublic: true,
    },
  })

  const event2 = await prisma.event.create({
    data: {
      eventCode: 'EVT002',
      name: 'Seminário de Ciência de Dados',
      idCreator: adminUser.id,
      description: 'Venha aprender sobre os fundamentos da ciência de dados.',
      startDateTime: new Date(),
      endDateTime: new Date(),
      isRemote: false,
      isPublic: true,
    },
  })

  await prisma.subscription.create({
    data: {
      idUser: regularUser.id,
      idEvent: event1.id,
      status: 'PENDING',
    },
  })

  await prisma.subscription.create({
    data: {
      idUser: regularUser.id,
      idEvent: event2.id,
      status: 'COMPLETED',
    },
  })

  console.log('Dados de seed gerados com sucesso')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
