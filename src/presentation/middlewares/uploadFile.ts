import { Request, Response, NextFunction } from 'express'

export function upload(req: Request, res: Response, next: NextFunction) {
  return next()
}
