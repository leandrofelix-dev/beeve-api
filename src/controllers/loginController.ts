import { Request, Response } from 'express'
import { prisma } from '../app'

export async function login(req: Request, res: Response) {
  const email = req.body.email
  const password = req.body.password

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(400).json({ error: 'user not found' })
  }
  if (user.password !== password) {
    return res.status(400).json({ error: 'wrong password' })
  }
  return res.status(200).json({ user })
}
