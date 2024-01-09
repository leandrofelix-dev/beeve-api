import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({ storage })

export function uploadMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const file = req.file
    console.log(file)
    return next()
  } catch (error) {
    throw new Error('Erro ao fazer upload da imagem')
  }
}
