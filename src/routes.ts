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
  .get('/event/:id', getEventById)
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

  .post('/user', createUserValidator, createUser)
  .delete('/user/:id', deleteUser)
  .put('/user/:id', editUser)

  .post('/registration', createRegistrationValidator, createRegistration)
  .delete('/registration/:id', deleteRegistration)
