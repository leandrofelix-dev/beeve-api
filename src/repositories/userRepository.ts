import { User } from '@prisma/client'
import { prisma } from '../../config/prisma'

export async function createUserRepository(data: Omit<User, 'id'>) {
  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.passwordHash,
      isExternal: data.isExternal,
      profilePicUrl: data.profilePicUrl,
      institutionalCode: data.institutionalCode,
      dateOfBirth: data.dateOfBirth,
    },
  })
  return user
}
