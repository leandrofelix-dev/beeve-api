import { Request, Response } from 'express'

import { errorMessagesPTBR } from '../../_shared/errors-messages'
import { prisma } from '../../config/prisma'
import Log from '../../config/logger'
import { responseMessagesPTBR } from '../../_shared/response'

export async function createRegistration(req: Request, res: Response) {
  const { idUser, idEvent } = req.body
  const isValidIdUser = await prisma.user.findUnique({ where: { id: idUser } })
  const isValidIdEvent = await prisma.event.findUnique({
    where: { id: idEvent },
  })
  if (!isValidIdUser || !isValidIdEvent) {
    return res
      .status(404)
      .json({ msg: errorMessagesPTBR['registration/USER_OR_EVENT_NOT_FOUND'] })
  }

  const isValidIdRegistration = await prisma.registration.findFirst({
    where: { idUser, idEvent },
  })
  if (isValidIdRegistration) {
    return res
      .status(400)
      .json({ msg: errorMessagesPTBR['registration/USER_ALREADY_IN_EVENT'] })
  }

  try {
    await prisma.registration.create({
      data: {
        idUser,
        idEvent,
      },
    })
    res
      .status(201)
      .json({ msg: responseMessagesPTBR['registration/CREATED_REGISTRATION'] })
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
    Log.error(`error: ${err.message}`)
  }
}

export async function deleteRegistration(req: Request, res: Response) {
  const id = req.params.id
  const registration = await prisma.registration.findUnique({
    where: {
      id,
    },
  })

  if (!registration) {
    return res
      .status(404)
      .json({ msg: errorMessagesPTBR['registration/NOT_FOUND'] })
  }

  try {
    const deletedRegistration = await prisma.registration.delete({
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
