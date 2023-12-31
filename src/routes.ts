import { Router, Response, Request } from 'express'

import multer from 'multer'
import {
  getEventByCode,
  getEventById,
  getAllEvents,
  createEvent,
  deleteEvent,
  editEvent,
} from './controllers/eventController'
import {
  createRegistration,
  deleteRegistration,
} from './controllers/registrationController'
import {
  createUserController,
  deleteUserController,
  editUserController,
} from './controllers/userController'
import {
  createEventValidator,
  createSubscriptionValidator,
  createUserValidator,
  authValidator,
} from './middlewares/validateMiddleware'
import { createToken } from './controllers/authController'
import { authenticate } from './middlewares/authMiddleware'
import uploadImage from './services/firebase'

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

  .post('/user', authenticate, createUserValidator, createUserController)
  .delete('/user/:id', authenticate, deleteUserController)
  .put('/user/:id', authenticate, editUserController)

  .post(
    '/registration',
    authenticate,
    createSubscriptionValidator,
    createRegistration,
  )
  .delete('/registration/:id', authenticate, deleteRegistration)
