import { Request, Response } from 'express'
import { prisma } from '../../config/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function createToken(req: Request, res: Response) {
  const secret = process.env.JWT_SECRET
  const { email, password } = req.body
  try {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'usuário nao encontrado' })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    const token = jwt.sign({ userId: user.id }, String(secret), {
      expiresIn: '1h',
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
