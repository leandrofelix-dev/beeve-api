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
// import { upload } from '../middlewares/uploadFile'
import { createEventValidator } from '../middlewares/validateMiddleware'

export function routerEvent(router: Router) {
  router
    .get('/event/code/:code', getEventByCode)
    .get('/event/:id', authenticate, getEventById)
    .get('/events', getAllEvents)
    .post(
      '/event',
      authenticate,
      // upload.single('cover'),
      createEventValidator,
      createEvent,
    )
    .delete('/event/:id', deleteEvent)
    .put('/event/:id', editEvent)

  return router
}
