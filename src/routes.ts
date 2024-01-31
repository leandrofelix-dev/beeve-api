import { Router, Response } from 'express'

import { authValidator } from './presentation/middlewares/validateMiddleware'
import { createToken } from './presentation/controllers/authController'
import { userRoutes } from './presentation/routes/userRoutes'
import { eventRoutes } from './presentation/routes/eventRoutes'
import { subscriptionRoutes } from './presentation/routes/subscriptionRoutes'
import { AuthenticatedRequest } from './presentation/middlewares/authMiddleware'

import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../config/swagger'

const router = Router()

router
  .get('/health', (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({ msg: 'Oi? A API está online! 👩🏽‍🚀' })
  })
  .post('/auth', authValidator, createToken)
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

userRoutes(router)
eventRoutes(router)
subscriptionRoutes(router)

export default router
