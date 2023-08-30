import { Request, Response } from 'express'
import { prisma } from '../app'
import Log from '../utils/logger'

export async function getUserDetails(req: Request, res: Response) {
  const { id } = req.params
  try {
    const user = await prisma.user.findMany({
      where: { id },
    })

    const registrations = await prisma.registration.findMany({
      where: { idUser: id },
    })

    const details = {
      user,
      registrations,
    }

    if (user.length === 0) {
      return res.status(404).json({ error: 'invalid user id' })
    }
    return res.status(200).json(details)
  } catch (err: any) {
    Log.error(`error: ${err.message}`)
  }
}
