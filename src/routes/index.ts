import { Router, Response, Request } from 'express'
import {
  createEvent,
  getEventByCode,
  getAllEvents,
} from '../controllers/eventController'
import { createEventValidator } from '../middlewares/createEventValidator'
import { createRegistration } from '../controllers/registrationController'

const router = Router()

export default router
  .get('/test', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Hi? the API is working!👨🏽‍🚀' })
  })
  .get('/event/:code', getEventByCode)
  .get('/events', getAllEvents)
  .post('/event', createEventValidator, createEvent)
  .post('/registration', createRegistration)
