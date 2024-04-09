/* eslint-disable @typescript-eslint/no-explicit-any */
import { responseMessagesPTBR } from '../../../_shared/response'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
import {
  createUserUseCase,
  deleteUserUseCase,
  editUserUseCase,
  getUserUseCase,
} from '../../data/usecases/userUseCase'
import { errorMessagesPTBR } from '../../../_shared/errors-messages'
import { APIResponse, UserLogged } from '../../../_shared/types'

export async function createUserController(
  req: AuthenticatedRequest,
  res: APIResponse,
) {
  try {
    const data = req.body
    const { user } = req as unknown as UserLogged
    const createdUser = await createUserUseCase(data, user)

    return res
      .status(201)
      .json({ [responseMessagesPTBR['user/CREATED']]: createdUser })
  } catch (err: any) {
    return res.status(400).json(err.message)
  }
}

export async function getUserController(
  req: AuthenticatedRequest,
  res: APIResponse,
) {
  try {
    const id = req.params.id
    const user = await getUserUseCase(id)

    if (!user)
      return res
        .status(400)
        .json({ msg: [errorMessagesPTBR['user/NOT_FOUND']] })

    return res.status(201).json(user)
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function editUserController(
  req: AuthenticatedRequest,
  res: APIResponse,
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

export async function deleteUserController(
  req: AuthenticatedRequest,
  res: APIResponse,
) {
  try {
    const id = req.params.id
    const deletedUser = await deleteUserUseCase(id)

    return res
      .status(201)
      .json({ [responseMessagesPTBR['user/DELETED']]: deletedUser.id })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}
