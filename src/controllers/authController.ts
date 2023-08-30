import { Request, Response } from 'express'
import { prisma } from '../app'
import Log from '../utils/logger'

export async function getUserDetails(req: Request, res: Response) {
  const idUser = req.params.id
  try {
    const user = await prisma.user.findMany({
      where: { id: idUser },
    })

    const registrations = await prisma.registration.findMany({
      where: { idUser },
    })

    const registeredEvents = await Promise.all(
      registrations.map(async (registration) => {
        const event = await prisma.event.findUnique({
          where: { id: registration.idEvent },
        })
        return event
      }),
    )

    const details = {
      user,
      registeredEvents,
    }

    if (user.length === 0) {
      return res.status(404).json({ error: 'invalid user id' })
    }
    return res.status(200).json(details)
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
  }
}
