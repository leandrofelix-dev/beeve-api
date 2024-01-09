import { Request, Router, Response } from 'express'

import { authValidator } from './presentation/middlewares/validateMiddleware'
import { createToken } from './presentation/controllers/authController'
import { routerUser } from './presentation/routers/userRoutes'
import { routerEvent } from './presentation/routers/eventRoutes'
import { routerSubscriptions } from './presentation/routers/subscriptionRoutes'

const router = Router()
router
  .get('/health', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Oi? A API está online! 👩🏽‍🚀' })
  })
  .post('/auth', authValidator, createToken)

routerUser(router)
routerEvent(router)
routerSubscriptions(router)

export default router
