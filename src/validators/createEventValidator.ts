import { Request, Response, NextFunction } from 'express'

import { event } from '../middlewares/dataRequirements'

export function createEventValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req
  try {
    event.parse(body)
    next()
  } catch (err: any) {
    res.status(400).json({ msg: err.errors })
  }
}
