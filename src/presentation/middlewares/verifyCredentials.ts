import { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from './authMiddleware'

function verifyCredentials(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.user)
    return res.status(401).send('Acesso negado. Autenticação obrigatória.')

  next()
}

export { verifyCredentials }
