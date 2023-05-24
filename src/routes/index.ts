import { Router, Response, Request } from 'express'
import {
  createEvent,
  getEvent,
  getAllEvents,
} from '../controllers/eventController'
import { createEventValidator } from '../middlewares/createEventValidator'

const router = Router()

export default router
  .get('/test', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Hi? the API is working!👨🏽‍🚀' })
  })
  .get('/event/:code', getEvent)
  .get('/events', getAllEvents)
  .post('/event', createEventValidator, createEvent)
