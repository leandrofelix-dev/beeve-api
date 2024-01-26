import { Router } from 'express'
import {
  getEventByCode,
  getEventById,
  getAllEvents,
  createEventController,
  deleteEventController,
  editEvent,
} from '../controllers/eventController'
import { authenticate } from '../middlewares/authMiddleware'
// import { createEventValidator } from '../middlewares/validateMiddleware'
import { sendFile } from '../../../config/multer'
import { uploadToSupabase } from '../../infra/services/supabase'

export function routerEvent(router: Router) {
  router
    .get('/event/code/:code', getEventByCode)
    .get('/event/:id', authenticate, getEventById)
    .get('/events', getAllEvents)
    .post(
      '/event',
      authenticate,
      // createEventValidator,
      sendFile.single('file'),
      uploadToSupabase,
      createEventController,
    )
    .delete('/event/:id', deleteEventController)
    .put('/event/:id', editEvent)

  return router
}
