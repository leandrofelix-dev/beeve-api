/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { errorMessagesPTBR } from '../../../_shared/errors-messages'
import { prisma } from '../../../config/prisma'
import Log from '../../../config/logger'
import { responseMessagesPTBR } from '../../../_shared/response'

export async function createSubscription(req: Request, res: Response) {
  const { idUser, idEvent } = req.body
  const isValidIdUser = await prisma.user.findUnique({ where: { id: idUser } })
  const isValidIdEvent = await prisma.event.findUnique({
    where: { id: idEvent },
  })
  if (!isValidIdUser || !isValidIdEvent) {
    return res
      .status(404)
      .json({ msg: errorMessagesPTBR['subscription/USER_OR_EVENT_NOT_FOUND'] })
  }

  const isValidIdRegistration = await prisma.subscription.findFirst({
    where: { idUser, idEvent },
  })
  if (isValidIdRegistration) {
    return res
      .status(400)
      .json({ msg: errorMessagesPTBR['subscription/USER_ALREADY_IN_EVENT'] })
  }

  try {
    await prisma.subscription.create({
      data: {
        idUser,
        idEvent,
      },
    })
    res.status(201).json({ msg: responseMessagesPTBR['subscription/CREATED'] })
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
