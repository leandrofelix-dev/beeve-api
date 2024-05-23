import { Router, Response } from 'express'

import { userRoutes } from './presentation/routes/userRoutes'
import { eventRoutes } from './presentation/routes/eventRoutes'
import { subscriptionRoutes } from './presentation/routes/subscriptionRoutes'
import { AuthenticatedRequest } from './presentation/middlewares/authMiddleware'

const router = Router()

router.get('/health', (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ msg: 'Ping...Pong... A API está online! 👩🏽‍🚀' })
})

userRoutes(router)
eventRoutes(router)
subscriptionRoutes(router)

export default router
