import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'Super Administrador',
      description: 'Usuário que tem acesso a todas as tabelas do sistema.',
    },
  })

  const adminRole = await prisma.role.create({
    data: {
      name: 'Administrador',
      description: 'Usuário administrador do sistema.',
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
      description: 'Usuário que participa dos eventos.',
    },
  })

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

  console.log('Roles e permissions criadas com sucesso')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
