import { PrismaClient } from '@prisma/client'
import { errorMessagesPTBR } from '../shared/errors-messages'

const prisma = new PrismaClient(
  process.env.NODE_ENV === 'production'
    ? {
        log: ['query', 'info', 'warn'],
        errorFormat: 'pretty',
      }
    : undefined,
)

async function connectToPostgres() {
  try {
    await prisma.$connect()
    console.info('✅ Banco de dados 🎲 - OK')
  } catch (error) {
    console.error(errorMessagesPTBR['config/DB_CONN_ERROR'], error)
  }
}

export { prisma, connectToPostgres }
