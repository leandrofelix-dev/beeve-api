/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { prisma } from '../../config/prisma'
import Log from '../../config/logger'
import { responseMessagesPTBR } from '../../_shared/response'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
import { createUserUseCase } from '../usecases/userUseCase'

export async function createUserController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const data = req.body
    const createdUser = await createUserUseCase(req, res, data)

    return res
      .status(201)
      .json({ [responseMessagesPTBR['user/CREATED_USER']]: createdUser })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
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

export async function editUser(req: AuthenticatedRequest, res: Response) {
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
