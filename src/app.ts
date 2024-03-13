import express, { NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import { AuthenticatedRequest } from './presentation/middlewares/authMiddleware'
import { Private, Public } from './presentation/decorators/routesPrivacy'

const app = express()

function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    return res.status(401).send('Acesso negado. Autenticação obrigatória.')
  }
  next()
}

class PublicController {
  @Public
  static publicRoute(req: Request, res: Response) {
    res.send('Rota pública acessada')
  }
}

class PrivateController {
  @Private
  static privateRoute(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res
        .status(403)
        .send('Acesso negado. Rota privada, autenticação obrigatória.')
    }
    res.send('Rota privada acessada')
  }
}

app.get('/public', PublicController.publicRoute)
app.get('/private', authenticate, PrivateController.privateRoute)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})
