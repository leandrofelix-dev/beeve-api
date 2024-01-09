import { Router } from 'express'
import {
  createSubscription,
  deleteRegistration,
} from '../controllers/registrationController'
import { authenticate } from '../middlewares/authMiddleware'
import { createSubscriptionValidator } from '../middlewares/validateMiddleware'

export function routerSubscriptions(router: Router) {
  router
    .post(
      '/subscription',
      authenticate,
      createSubscriptionValidator,
      createSubscription,
    )
    .delete('/subscription/:id', authenticate, deleteRegistration)

  return router
}
