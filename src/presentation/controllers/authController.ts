import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { authUseCase } from '../../data/usecases/authUseCase'
dotenv.config()

export async function createToken(req: Request, res: Response) {
  const secret = process.env.JWT_SECRET
  const { email, password } = req.body
  try {
    const response = await authUseCase(email, password, secret)
    res.status(200).json({ token: `Bearer ${response}` })
  } catch (error) {
    return res.status(401).json({ error: 'Email ou senha inválidos!' })
  }
}
