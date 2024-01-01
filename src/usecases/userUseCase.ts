import { prisma } from '../../config/prisma'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
import { errorMessagesPTBR } from '../../_shared/errors-messages'
import { UserCreateDTO } from '../models/userDTO'
import {
  createUserRepository,
  deleteUserRepository,
  editUserRepository,
  getUserById,
} from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

export async function createUserUseCase(
  req: AuthenticatedRequest,
  data: UserCreateDTO,
) {
  const {
    fullName,
    email,
    profilePicUrl,
    password,
    passwordConfirmation,
    isExternal,
    institutionalCode,
  } = data
  const dateOfBirth = new Date(data.dateOfBirth)

  if (password !== passwordConfirmation)
    throw new Error(errorMessagesPTBR['user/PASSWORD_NOT_MATCH'])

  const passwordHash = await bcrypt.hash(password, 10)

  const alreadyExistInstitutionalCode = await prisma.user.findFirst({
    where: { institutionalCode },
  })

  if (alreadyExistInstitutionalCode)
    throw new Error(errorMessagesPTBR['user/STUDENT_CODE_ALREADY_EXISTS'])

  const alreadyExistEmail = await prisma.user.findFirst({ where: { email } })
  if (alreadyExistEmail?.email)
    throw new Error(errorMessagesPTBR['user/EMAIL_ALREADY_EXISTS'])

  return createUserRepository({
    fullName,
    email,
    passwordHash,
    isExternal,
    profilePicUrl,
    institutionalCode,
    dateOfBirth,
  })
}

export async function deleteUserUseCase(id: string) {
  const user = getUserById(id)
  if (!user) throw new Error('user not found')

  return deleteUserRepository(id)
}

export async function editUserUseCase(id: string, data: User) {
  const user = await getUserById(id)

  if (!user) throw new Error('user not found')

  return editUserRepository(user, data)
}

export async function getUserUseCase(id: string) {
  return getUserById(id)
}
