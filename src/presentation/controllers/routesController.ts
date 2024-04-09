import { AuthRequired } from '../decorators/routesPrivacy'
import { NextFunction, Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'

class PrivateRouteController {
  @AuthRequired
  static privateRoute(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.user) {
      res.status(401).send('Acesso negado. Autenticação obrigatória.')
      next()
    }
    res
      .status(200)
      .send(`O usuário ${JSON.stringify(req.user)} acessou uma rota privada.`)
  }
}

export { PrivateRouteController }
