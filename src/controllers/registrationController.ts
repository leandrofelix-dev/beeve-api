import { Request, Response } from 'express'
import { prisma } from '../app'
import Log from '../utils/logger'

export async function createRegistration(req: Request, res: Response) {
  const data = req.body
  const { idUser, idEvent } = data
  try {
    const registration = await prisma.registration.create({
      data: {
        idEvent,
        idUser,
      },
    })
    Log.info(
      `user ${idUser} registred in ${idEvent}, registration: ${registration}`,
    )
    return res.status(201).json(registration)
  } catch (e: any) {
    Log.error(`error: ${e.message}`)
  }
}
