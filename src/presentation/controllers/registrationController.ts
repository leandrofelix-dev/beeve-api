/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { errorMessagesPTBR } from '../../../_shared/errors-messages'
import { prisma } from '../../../config/prisma'
import Log from '../../../config/logger'
import { responseMessagesPTBR } from '../../../_shared/response'
import { createSubscriptionUseCase } from '../../data/usecases/subscriptionUseCase'

export async function createSubscription(req: Request, res: Response) {
  const { idUser, idEvent } = req.body

  try {
    const createdSubscription = createSubscriptionUseCase(idUser, idEvent)
    res.status(201).json({
      [responseMessagesPTBR['subscription/CREATED']]: createdSubscription,
    })
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
    Log.error(`error: ${err.message}`)
  }
}

export async function deleteRegistration(req: Request, res: Response) {
  const id = req.params.id
  const registration = await prisma.subscription.findUnique({
    where: {
      id,
    },
  })

  if (!registration) {
    return res
      .status(404)
      .json({ msg: errorMessagesPTBR['subscription/NOT_FOUND'] })
  }

  try {
    const deletedRegistration = await prisma.subscription.delete({
      where: {
        id,
      },
    })
    Log.info(`registration ${id} was be deleted`)
    return res.status(204).json({ deleted: deletedRegistration })
  } catch (e: any) {
    Log.error(`error: ${e.message}`)
  }
}
