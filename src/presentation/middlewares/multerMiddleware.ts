import { Request, Response, NextFunction } from 'express'
import { upload } from '../../../config/multer'

function multerMiddleware(req: Request, res: Response, next: NextFunction) {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(500).send('Erro ao processar o arquivo')

    const file = req.file
    if (!file) return res.status(400).send('Nenhum arquivo foi enviado.')

    next()
  })
}

export { multerMiddleware }
