import { Request, Response, NextFunction } from 'express'

import { user } from './dataRequirements'

export function createUserValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req
  try {
    user.parse(body)
    next()
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}
