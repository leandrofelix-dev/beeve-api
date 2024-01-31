/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { responseMessagesPTBR } from '../../../_shared/response'
import {
  createSubscriptionUseCase,
  deleteSubscriptionUseCase,
} from '../../data/usecases/subscriptionUseCase'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'

export async function createSubscriptionController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const { idUser, idEvent } = req.body

    const createdSubscription = await createSubscriptionUseCase(idUser, idEvent)
    return res.status(201).json({
      [responseMessagesPTBR['subscription/CREATED']]: createdSubscription,
    })
  } catch (err: any) {
    return res.status(500).json(err.message)
  }
}

export async function deleteSubscriptionController(
  req: Request,
  res: Response,
) {
  const { id } = req.params

  try {
    const deletedSubscription = await deleteSubscriptionUseCase(id)

    return res.status(201).json({
      [responseMessagesPTBR['subscription/DELETED']]: deletedSubscription,
    })
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
}
