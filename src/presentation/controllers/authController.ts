import { Request } from 'express'
import { authUseCase } from '../../data/usecases/authUseCase'
import { APIResponse } from '../../../shared/types'
import { errorMessagesPTBR } from '../../../shared/errors-messages'
import dotenv from 'dotenv'

dotenv.config()

export async function createToken(req: Request, res: APIResponse) {
  const secret = process.env.JWT_SECRET
  const { email, password } = req.body
  try {
    const response = await authUseCase(email, password, secret)
    res.status(200).json({
      content: {
        message: 'Login realizado com sucesso!',
        body: { token: `Bearer ${response}` },
      },
    })
  } catch (error) {
    return res.status(401).json({
      content: { message: errorMessagesPTBR['auth/INVALID_CREDENTIALS'] },
    })
  }
}
