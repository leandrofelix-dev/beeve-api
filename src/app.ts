// Arquivo: app.ts
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import { CORSConfig } from '../config/cors'
import { connectToPostgres } from '../config/prisma'
import { connectToSupabase } from '../config/supa'
import {
  AuthenticatedRequest,
  authenticate,
} from './presentation/middlewares/authMiddleware'
import router from './routes'
import { AuthRequired } from './presentation/decorators/routesPrivacy'

dotenv.config()
connectToPostgres()
connectToSupabase()

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(CORSConfig)
app.use(helmet())

app.use('/api/', router)

function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).send('Acesso negado. Autenticação obrigatória.')
  }
  next()
}

class PublicController {
  @AuthRequired
  static publicRoute(req: Request, res: Response) {
    res.send('Rota pública acessada')
  }
}

class PrivateController {
  @AuthRequired
  static privateRoute(req: AuthenticatedRequest, res: Response) {
    res.send('Rota privada acessada')
  }
}

app.get('/api/public', PublicController.publicRoute)
app.get('/api/private', authenticate, auth, PrivateController.privateRoute)

app.listen(port, () => {
  console.info(`API iniciada na porta ${port} 🚀`)
})
