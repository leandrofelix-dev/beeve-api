import { Router } from 'express'
import {
  createSubscriptionController,
  deleteSubscriptionController,
} from '../controllers/registrationController'
import { authenticate } from '../middlewares/authMiddleware'
import { createSubscriptionValidator } from '../middlewares/validateMiddleware'

export function subscriptionRoutes(router: Router) {
  router
    .post(
      '/subscription',
      authenticate,
      createSubscriptionValidator,
      createSubscriptionController,
    )
    .delete('/subscription/:id', authenticate, deleteSubscriptionController)

  return router
}
