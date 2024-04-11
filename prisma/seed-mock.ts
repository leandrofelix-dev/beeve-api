import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar as roles
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'Super Administrador',
      description: 'Permissão completa.',
    },
  })

  const adminRole = await prisma.role.create({
    data: {
      name: 'Administrador',
      description: 'Permissão de administração.',
    },
  })

  const creatorRole = await prisma.role.create({
    data: {
      name: 'Criador',
      description: 'Usuário que cria eventos.',
    },
  })

  const userRole = await prisma.role.create({
    data: {
      name: 'Usuário',
      description: 'Usuário padrão.',
    },
  })

  // Criar as permissions
  const permissions: Record<string, string[]> = {}
  const tables = [
    'roles',
    'permissions',
    'role_permissions',
    'users',
    'events',
    'subscriptions',
  ]

  for (const table of tables) {
    const readPermission = await prisma.permission.create({
      data: {
        name: `read_${table}`,
        description: `Permissão de leitura para a tabela ${table}.`,
      },
    })

    const writePermission = await prisma.permission.create({
      data: {
        name: `write_${table}`,
        description: `Permissão de escrita para a tabela ${table}.`,
      },
    })

    permissions[table] = [readPermission.id, writePermission.id]
  }

  // Associar as permissões aos cargos correspondentes
  const roles = [
    { role: superAdminRole, permissions: Object.values(permissions).flat() },
    { role: adminRole, permissions: [] }, // Admin não tem permissões especiais
    { role: creatorRole, permissions: [...permissions.events] }, // Criador tem todas as permissões de eventos
    { role: userRole, permissions: [...permissions.events.slice(0, 1)] }, // Usuário só tem permissão de leitura para eventos
  ]

  for (const { role, permissions } of roles) {
    for (const permissionId of permissions) {
      await prisma.rolePermission.create({
        data: {
          roleId: role.id,
          permissionId,
        },
      })
    }
  }

  // Seed para a tabela de usuários
  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@example.com',
      passwordHash: 'hashedPassword',
      isExternal: false,
      roleId: adminRole.id,
    },
  })

  const regularUser = await prisma.user.create({
    data: {
      fullName: 'Regular User',
      email: 'user@example.com',
      passwordHash: 'hashedPassword',
      isExternal: false,
      roleId: userRole.id,
    },
  })

  // Seed para a tabela de eventos
  const event1 = await prisma.event.create({
    data: {
      eventCode: 'EVT001',
      name: 'Workshop de Desenvolvimento Web',
      idCreator: creatorRole.id,
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
      idCreator: creatorRole.id,
      description: 'Venha aprender sobre os fundamentos da ciência de dados.',
      startDateTime: new Date(),
      endDateTime: new Date(),
      isRemote: false,
      isPublic: true,
    },
  })

  // Seed para outras tabelas (adapte conforme necessário)

  console.log('Seed de mock para desenvolvimento concluída')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
