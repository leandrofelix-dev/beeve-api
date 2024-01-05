/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { responseMessagesPTBR } from '../../_shared/response'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
import {
  createUserUseCase,
  deleteUserUseCase,
  editUserUseCase,
  getUserUseCase,
} from '../usecases/userUseCase'

export async function createUserController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const data = req.body
    const createdUser = await createUserUseCase(req, data)

    return res
      .status(201)
      .json({ [responseMessagesPTBR['user/CREATED']]: createdUser })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deleteUserController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const id = req.params.id
    await deleteUserUseCase(id)

    return res.status(201).json([responseMessagesPTBR['user/DELETED']])
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function editUserController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const id = req.params.id
    const data = req.body

    const editedUser = await editUserUseCase(id, data)
    return res
      .status(201)
      .json({ [responseMessagesPTBR['user/UPDATED']]: editedUser })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function getUserController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const id = req.params.id
    const user = await getUserUseCase(id)

    return res.status(201).json(user)
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}
