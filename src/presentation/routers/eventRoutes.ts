import { Router } from 'express'
import {
  getEventByCode,
  getEventById,
  getAllEvents,
  createEvent,
  deleteEvent,
  editEvent,
} from '../controllers/eventController'
import { authenticate } from '../middlewares/authMiddleware'
import { createEventValidator } from '../middlewares/validateMiddleware'
import { upload } from '../middlewares/uploadMiddleware'

export function routerEvent(router: Router) {
  router
    .get('/event/code/:code', getEventByCode)
    .get('/event/:id', authenticate, getEventById)
    .get('/events', getAllEvents)
    .post(
      '/event',
      authenticate,
      upload.single('file'),
      createEventValidator,
      createEvent,
    )
    .delete('/event/:id', deleteEvent)
    .put('/event/:id', editEvent)

  return router
}
