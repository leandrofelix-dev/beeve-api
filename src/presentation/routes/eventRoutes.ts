import { Router } from 'express'
import {
  getEventById,
  getAllEvents,
  createEventController,
  deleteEventController,
  editEvent,
  getEventByCodeController,
} from '../controllers/eventController'
import { authenticate } from '../middlewares/authMiddleware'
import { sendFile } from '../../../config/multer'
import { uploadToSupabase } from '../../infra/services/supabase'

export function routerEvent(router: Router) {
  router
    .get('/event/code/:code', getEventByCodeController)
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
