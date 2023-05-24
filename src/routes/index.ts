import { Router, Response } from 'express'
import {
  createEvent,
  getEvent,
  getAllEvents,
} from '../controllers/eventController'
import { createEventValidator } from '../middlewares/createEventValidator'

const router = Router()

export default router
  .get('/test', (res: Response) => {
    res.status(200).json({ msg: 'Hi? the API is working here👨🏽‍🚀' })
  })
  .get('/event/:code', getEvent)
  .get('/events', getAllEvents)
  .post('/event', createEventValidator, createEvent)
