import { Router, Response, Request } from 'express'

import { userRoutes } from './presentation/routes/userRoutes'
import { eventRoutes } from './presentation/routes/eventRoutes'
import { subscriptionRoutes } from './presentation/routes/subscriptionRoutes'
import { AuthenticatedRequest } from './presentation/middlewares/authMiddleware'
import { createToken } from './presentation/controllers/authController'

const router = Router()

router
  .get('/health', (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({ msg: 'Ping...Pong... A API está online! 👩🏽‍🚀' })
  })
  .post('/auth', (req: Request, res: Response) => {
    createToken(req, res)
  })

userRoutes(router)
eventRoutes(router)
subscriptionRoutes(router)

export default router
