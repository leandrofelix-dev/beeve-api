import { Router, Response, Request } from 'express'

import multer from 'multer'
import {
  getEventByCode,
  getEventById,
  getAllEvents,
  createEvent,
  deleteEvent,
  editEvent,
} from './presentation/controllers/eventController'
import {
  createSubscription,
  deleteRegistration,
} from './presentation/controllers/registrationController'
import {
  createUserController,
  deleteUserController,
  editUserController,
  getUserController,
} from './presentation/controllers/userController'
import {
  createEventValidator,
  createSubscriptionValidator,
  createUserValidator,
  authValidator,
} from './presentation/middlewares/validateMiddleware'
import { createToken } from './presentation/controllers/authController'
import { authenticate } from './presentation/middlewares/authMiddleware'
import uploadImage from './infra/services/firebase'

const sizeInBytesToOneMegabyte = 1024 * 1024 * 1

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: sizeInBytesToOneMegabyte },
})

const router = Router()

export default router
  .get('/health', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Oi? A API está online! 👩🏽‍🚀' })
  })
  .post('/auth', authValidator, createToken)

  // @Event
  .get('/event/code/:code', getEventByCode)
  .get('/event/:id', authenticate, getEventById)
  .get('/events', getAllEvents)
  .post(
    '/event',
    upload.single('coverImage'),
    uploadImage,
    createEventValidator,
    createEvent,
  )
  .delete('/event/:id', deleteEvent)
  .put('/event/:id', editEvent)

  // @User
  .get('/user/:id', authenticate, getUserController)
  .post('/user', authenticate, createUserValidator, createUserController)
  .delete('/user/:id', authenticate, deleteUserController)
  .put('/user/:id', authenticate, editUserController)

  // @Subscription
  .post(
    '/subscription',
    authenticate,
    createSubscriptionValidator,
    createSubscription,
  )
  .delete('/subscription/:id', authenticate, deleteRegistration)
