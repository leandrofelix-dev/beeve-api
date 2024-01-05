import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { authUseCase } from '../usecases/authUseCase'
dotenv.config()

export async function createToken(req: Request, res: Response) {
  const secret = process.env.JWT_SECRET
  const { email, password } = req.body
  try {
    res.json({ token: await authUseCase(email, password, secret) })
  } catch (error) {
    res.status(500).json({ error })
  }
}
