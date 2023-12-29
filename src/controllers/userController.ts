import { Request, Response } from 'express'
import { prisma } from '../../config/prisma'
import Log from '../../config/logger'
import { errorMessagesPTBR } from '../../_shared/errors-messages'
import { responseMessagesPTBR } from '../../_shared/response'

export async function createUser(req: Request, res: Response) {
  try {
    const data = req.body
    const {
      fullName,
      dateOfBirth,
      email,
      password,
      passwordConfirmation,
      profilePicUrl,
      isExternal,
      institutionalCode,
    } = data

    if (password !== passwordConfirmation)
      throw new Error(errorMessagesPTBR['user/PASSWORD_NOT_MATCH'])

    const passwordHash = password

    // if (!isExternal) {
    //   if (!institutionalCode)
    //     throw new Error(errorMessagesPTBR['user/STUDENT_CODE_REQUIRED'])

    //   const alreadyExistInstitutionalCode = await prisma.user.findFirst({
    //     where: { institutionalCode },
    //   })

    //   if (alreadyExistInstitutionalCode)
    //     throw new Error(errorMessagesPTBR['user/STUDENT_CODE_ALREADY_EXISTS'])
    // }

    const alreadyExistEmail = await prisma.user.findFirst({ where: { email } })
    if (alreadyExistEmail?.email)
      throw new Error(errorMessagesPTBR['user/EMAIL_ALREADY_EXISTS'])

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        isExternal,
        profilePicUrl,
        institutionalCode,
        dateOfBirth: new Date(dateOfBirth),
      },
    })
    Log.info(`user created: ${user}`)
    return res
      .status(201)
      .json({ [responseMessagesPTBR['user/CREATED_USER']]: user })
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
    return res.status(400).json({ error: err.message })
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.params.id
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) throw new Error('user not found')

    const deletedUser = await prisma.user.delete({ where: { id } })
    Log.info(`user ${id} was be deleted`)
    return res.status(201).json({ deleted: deletedUser })
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
    return res.status(400).json({ error: err.message })
  }
}

export async function editUser(req: Request, res: Response) {
  try {
    const id = req.params.id
    const data = req.body

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) throw new Error('user not found')

    const updatedUser = await prisma.user.update({ where: { id }, data })

    Log.info(`user ${id} was be updated`)
    return res.status(200).json({ updated: updatedUser })
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
    return res.status(400).json({ error: err.message })
  }
}
