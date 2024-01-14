import { Router } from 'express'
import {
  getEventByCode,
  getEventById,
  getAllEvents,
  createEventController,
  deleteEvent,
  editEvent,
} from '../controllers/eventController'
import { authenticate } from '../middlewares/authMiddleware'
import { createEventValidator } from '../middlewares/validateMiddleware'
// import { upload } from '../middlewares/uploadMiddleware'
// import { multerMiddleware } from '../middlewares/multerMiddleware'
// import { upload } from '../../../config/multer'

export function routerEvent(router: Router) {
  router
    .get('/event/code/:code', getEventByCode)
    .get('/event/:id', authenticate, getEventById)
    .get('/events', getAllEvents)
    .post(
      '/event',
      authenticate,
      createEventValidator,
      // upload.single('file'),
      // multerMiddleware,
      createEventController,
    )
    .delete('/event/:id', deleteEvent)
    .put('/event/:id', editEvent)

  return router
}
