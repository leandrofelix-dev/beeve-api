import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string | undefined
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization')
  const secret = process.env.JWT_SECRET

  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  const tokenBearer = token.replace('Bearer ', '')

  jwt.verify(tokenBearer, String(secret), (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Forbidden' })
    req.user = decoded
    next()
  })
}
