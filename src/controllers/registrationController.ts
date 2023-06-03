import { Request, Response, NextFunction } from 'express'
import { prisma } from '../app'
import Log from '../utils/logger'

export async function createRegistration(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { idUser, idEvent } = req.body
  const isValidIdUser = await prisma.user.findUnique({ where: { id: idUser } })
  const isValidIdEvent = await prisma.event.findUnique({
    where: { id: idEvent },
  })
  if (!isValidIdUser || !isValidIdEvent) {
    return res.status(404).json({ msg: 'invalid id' })
  }

  const isValidIdRegistration = await prisma.registration.findFirst({
    where: { idUser, idEvent },
  })
  if (isValidIdRegistration) {
    return res
      .status(400)
      .json({ msg: 'user already registered in this event' })
  }

  try {
    await prisma.registration.create({
      data: {
        idUser,
        idEvent,
      },
    })
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
    return res.status(404).json({ msg: 'registration not found' })
  }

  try {
    const deletedRegistration = await prisma.registration.delete({
      where: {
        id,
      },
    })
    Log.info(`registration ${id} was be deleted`)
    return res.status(201).json({ deleted: deletedRegistration })
  } catch (e: any) {
    Log.error(`error: ${e.message}`)
  }
}
