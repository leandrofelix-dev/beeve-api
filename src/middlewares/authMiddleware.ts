import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export interface AuthenticatedRequest extends Request {
  user?: unknown
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization')
  const secret = process.env.JWT_SECRET

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  jwt.verify(token, String(secret), (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    req.user = decoded

    next()
  })
}
