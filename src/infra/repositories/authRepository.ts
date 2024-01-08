import { User } from '@prisma/client'
import { prisma } from '../../../config/prisma'

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findFirst({ where: { email } })
}
