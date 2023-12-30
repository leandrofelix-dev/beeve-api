import { prisma } from '../../config/prisma'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
import { Response } from 'express'
import bcrypt from 'bcrypt'
import { errorMessagesPTBR } from '../../_shared/errors-messages'
import { UserCreateDTO } from '../models/userDTO'
import { createUserRepository } from '../repositories/userRepository'

export async function createUserUseCase(
  req: AuthenticatedRequest,
  res: Response,
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
