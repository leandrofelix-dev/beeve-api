/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'
import { APIResponse, UserLogged } from '../../../_shared/types'
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
import logger from '../../../config/logger'

export async function getAllEventsController(req: Request, res: APIResponse) {
  try {
    const events = await getAllEventsUseCase()
    if (!events)
      return res
        .status(404)
        .json({ content: { message: errorMessagesPTBR['event/NOT_FOUND'] } })

    return res.status(201).json({
      content: { message: responseMessagesPTBR['api/SUCCESS'], body: events },
    })
  } catch (err: any) {
    logger.error(err.message)
    return res.status(500).json({
      content: { message: errorMessagesPTBR['api/ERROR'] },
    })
  }
}

export async function getEventByCodeController(req: Request, res: APIResponse) {
  const { code } = req.params
  try {
    const event = await getEventByCodeUseCase(code)
    if (!event)
      return res.status(404).json({
        content: {
          message: errorMessagesPTBR['event/NOT_FOUND'],
          body: event,
        },
      })

    return res.status(201).json({
      content: { message: responseMessagesPTBR['api/SUCCESS'], body: event },
    })
  } catch (err: any) {
    logger.error(err.message)
    return res.status(500).json({
      content: { message: errorMessagesPTBR['api/ERROR'] },
    })
  }
}

export async function getEventByIdController(req: Request, res: APIResponse) {
  const { id } = req.params
  try {
    const event = await getEventByIdUseCase(id)
    if (!event)
      return res
        .status(404)
        .json({ error: errorMessagesPTBR['event/NOT_FOUND'] })

    return res.status(201).json({
      content: { message: responseMessagesPTBR['api/SUCCESS'], body: event },
    })
  } catch (err: any) {
    logger.error(err.message)
    return res.status(500).json({
      content: { message: errorMessagesPTBR['api/ERROR'] },
    })
  }
}

export async function createEventController(
  req: AuthenticatedRequest,
  res: APIResponse,
) {
  try {
    const { user } = req as unknown as UserLogged
    const { body, file } = req
    const data = {
      ...body,
      file,
    }

    const createdEvent = await createEventUseCase(data, user)

    return res.status(201).json({
      content: { message: responseMessagesPTBR['event/CREATED'] },
      body: createdEvent,
    })
  } catch (err: any) {
    logger.error(err.message)
    return res.status(500).json({
      content: { message: errorMessagesPTBR['api/ERROR'] },
    })
  }
}

export async function deleteEventController(req: Request, res: APIResponse) {
  const { id } = req.params
  try {
    const deletedEvent = await deleteEventUseCase(id)

    return res.status(201).json({
      content: {
        message: responseMessagesPTBR['event/DELETED'],
        body: deletedEvent,
      },
    })
  } catch (err: any) {
    logger.error(err.message)
    return res.status(500).json({
      content: { message: errorMessagesPTBR['api/ERROR'] },
    })
  }
}

export async function editEventController(req: Request, res: APIResponse) {
  const { id } = req.params
  const { body } = req
  try {
    const editedEvent = await editEventUseCase(id, body)

    return res.status(201).json({
      content: {
        message: responseMessagesPTBR['event/UPDATED'],
        body: editedEvent,
      },
    })
  } catch (err: any) {
    logger.error(err.message)
    return res.status(500).json({
      content: { message: errorMessagesPTBR['api/ERROR'] },
    })
  }
}
