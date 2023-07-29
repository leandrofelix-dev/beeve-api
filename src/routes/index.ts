import { Router, Response, Request } from 'express'

import {
  createEvent,
  getEventByCode,
  getAllEvents,
  deleteEvent,
  editEvent,
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

const sizeInBytesToOneMegabyte: any = 1024 * 1024 * 1

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: sizeInBytesToOneMegabyte,
})

const router = Router()

export default router

  // Test
  .get('/test', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Hi? the API is working!👨🏽‍🚀' })
  })

  // Event
  .get('/event/:code', getEventByCode)
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

  // User
  .post(
    '/user',
    createUserValidator,
    createUser
  )
  .delete('/user/:id', deleteUser)
  .put('/user/:id', editUser)

  //Registration
  .post('/registration', createRegistrationValidator, createRegistration)
  .delete('/registration/:id', deleteRegistration)
