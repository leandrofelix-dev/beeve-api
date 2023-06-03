import { Router, Response, Request } from 'express'

import {
  createEvent,
  getEventByCode,
  getAllEvents,
  deleteEvent,
} from '../controllers/eventController'

import {
  createRegistration,
  deleteRegistration,
} from '../controllers/registrationController'

import multer from 'multer'

import { createEventValidator } from '../middlewares/createEventValidator'
import { createRegistrationValidator } from '../middlewares/createRegistrationValidator'

import uploadImage from '../services/firebase'

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

  .post('/registration', createRegistrationValidator, createRegistration)
  .delete('/registration/:id', deleteRegistration)
