import { Router } from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import {
  createUserController,
  deleteUserController,
  editUserController,
  getUserController,
} from '../controllers/userController'
import { createUserValidator } from '../middlewares/validateMiddleware'

export function userRoutes(router: Router) {
  router
    .get('/user/:id', authenticate, getUserController)
    .post('/user', authenticate, createUserValidator, createUserController)
    .delete('/user/:id', authenticate, deleteUserController)
    .put('/user/:id', authenticate, editUserController)

  return router
}
