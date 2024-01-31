/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
import { UserLogged } from '../../../_shared/types'
import {
  createEventUseCase,
  deleteEventUseCase,
  editEventUseCase,
  getAllEventsUseCase,
  getEventByCodeUseCase,
  getEventByIdUseCase,
} from '../../data/usecases/eventUseCase'
import { errorMessagesPTBR } from '../../../_shared/errors-messages'
import { responseMessagesPTBR } from '../../../_shared/response'

export async function getEventByCodeController(req: Request, res: Response) {
  const code = req.params.code
  try {
    const event = await getEventByCodeUseCase(code)
    if (event)
      return res
        .status(404)
        .json({ error: errorMessagesPTBR['event/NOT_FOUND'] })

    return res.status(201).json({ event })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function getEventByIdController(req: Request, res: Response) {
  const id = req.params.id
  try {
    const event = await getEventByIdUseCase(id)
    if (event)
      return res
        .status(404)
        .json({ error: errorMessagesPTBR['event/NOT_FOUND'] })

    return res.status(201).json({ event })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function getAllEventsController(req: Request, res: Response) {
  try {
    const events = await getAllEventsUseCase()
    if (events)
      return res
        .status(404)
        .json({ error: errorMessagesPTBR['event/NOT_FOUND'] })

    return res.status(201).json({ event })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export async function createEventController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const { user } = req as unknown as UserLogged
    const { body, file } = req
    const data = {
      ...body,
      file,
    }

    const createdEvent = await createEventUseCase(data, user)

    return res
      .status(201)
      .json({ [responseMessagesPTBR['event/CREATED']]: createdEvent })
  } catch (err: any) {
    return res.status(500).json(err.message)
  }
}

export async function deleteEventController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const deletedEvent = await deleteEventUseCase(id)

    return res.status(201).json({ deleted: deletedEvent.id })
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
}

export async function editEventController(req: Request, res: Response) {
  const id = req.params.id
  const data = req.body
  try {
    const editedEvent = await editEventUseCase(id, data)

    return res
      .status(201)
      .json({ [responseMessagesPTBR['user/UPDATED']]: editedEvent.id })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}
