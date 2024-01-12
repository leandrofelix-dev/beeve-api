import { Request, Router, Response } from 'express'

import { authValidator } from './presentation/middlewares/validateMiddleware'
import { createToken } from './presentation/controllers/authController'
import { routerUser } from './presentation/routes/userRoutes'
import { routerEvent } from './presentation/routes/eventRoutes'
import { routerSubscriptions } from './presentation/routes/subscriptionRoutes'

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
