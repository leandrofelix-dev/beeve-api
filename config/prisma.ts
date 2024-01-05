import { PrismaClient } from '@prisma/client'
import { errorMessagesPTBR } from '../_shared/errors-messages'

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

export async function connectToDatabase() {
  try {
    await prisma.$connect()
    console.info('Conectado ao postgresSQL 🐘')
  } catch (error) {
    console.error(errorMessagesPTBR['config/DB_CONN_ERROR'], error)
  }
}
