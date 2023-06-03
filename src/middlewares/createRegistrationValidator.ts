import { Request, Response, NextFunction } from 'express'

import { registration } from './dataRequirements'

export async function createRegistrationValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req
  try {
    registration.parse(body)
    next()
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}
