import { User } from '@prisma/client'
import { prisma } from '../../../config/prisma'

export async function createUserRepository(data: Omit<User, 'id'>) {
  return await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.passwordHash,
      isExternal: data.isExternal,
      profilePicUrl: data.profilePicUrl,
      institutionalCode: data.institutionalCode,
    },
  })
}
export async function deleteUserRepository(id: string) {
  return await prisma.user.delete({ where: { id } })
}
export async function editUserRepository(user: User, data: Omit<User, 'id'>) {
  return await prisma.user.update({ where: { id: user.id }, data })
}
export async function getUserByIdRepository(id: string) {
  return await prisma.user.findUnique({ where: { id } })
}
