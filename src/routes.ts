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
import { createUser, deleteUser, editUser } from './controllers/userController'
import { createEventValidator } from './middlewares/createEventValidator'
import { createRegistrationValidator } from './middlewares/createRegistrationValidator'
import { createUserValidator } from './middlewares/createUserValidator'
import uploadImage from './services/firebase'
import { createToken } from './controllers/authController'
import { authenticate } from './middlewares/authMiddleware'

const sizeInBytesToOneMegabyte = 1024 * 1024 * 1

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: sizeInBytesToOneMegabyte },
})

const router = Router()

export default router
  .get('/health', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Oi? A API está online! 👩🏽‍🚀' })
  })

  .post('/auth', createToken)

  .get('/event/code/:code', getEventByCode)
  .get('/event/:id', authenticate, getEventById)
  .get('/events', getAllEvents)
  .post(
    '/event',
    Multer.single('coverImage'),
    uploadImage,
    createEventValidator,
    createEvent,
  )
  .delete('/event/:id', deleteEvent)
  .put('/event/:id', editEvent)

  .post('/user', authenticate, createUserValidator, createUser)
  .delete('/user/:id', authenticate, deleteUser)
  .put('/user/:id', authenticate, editUser)

  .post(
    '/registration',
    authenticate,
    createRegistrationValidator,
    createRegistration,
  )
  .delete('/registration/:id', authenticate, deleteRegistration)
