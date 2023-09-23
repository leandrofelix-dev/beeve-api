import { Router, Response, Request } from 'express'

import {
  createEvent,
  getEventByCode,
  getAllEvents,
  deleteEvent,
  editEvent,
  getEventById,
} from '../controllers/eventController'

import {
  createRegistration,
  deleteRegistration,
} from '../controllers/registrationController'

import multer from 'multer'

import { createEventValidator } from '../middlewares/createEventValidator'
import { createRegistrationValidator } from '../middlewares/createRegistrationValidator'

import uploadImage from '../services/firebase'
import { createUser, deleteUser, editUser } from '../controllers/userController'
import { createUserValidator } from '../middlewares/createUserValidator'
import { getUserDetails } from '../controllers/authController'

const sizeInBytesToOneMegabyte: any = 1024 * 1024 * 1

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: sizeInBytesToOneMegabyte,
})

const router = Router()

export default router
  .get('/test', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Hi? the API is working!👨🏽‍🚀' })
  })

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
  .get('/auth/user/:id', getUserDetails)

  .post('/registration', createRegistrationValidator, createRegistration)
  .delete('/registration/:id', deleteRegistration)
