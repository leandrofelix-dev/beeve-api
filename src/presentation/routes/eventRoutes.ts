import { Router } from 'express'
import {
  getEventByIdController,
  getAllEventsController,
  createEventController,
  deleteEventController,
  editEventController,
  getEventByCodeController,
} from '../controllers/eventController'
import { authenticate } from '../middlewares/authMiddleware'
import { sendFile } from '../../../config/multer'
import { uploadToSupabase } from '../../infra/services/supabase'
import { createEventValidator } from '../middlewares/validateMiddleware'

export function eventRoutes(router: Router) {
  router
    .get('/event/code/:code', getEventByCodeController)
    .get('/event/id/:id', authenticate, getEventByIdController)
    .get('/events', getAllEventsController)
    .post(
      '/event',
      authenticate,
      sendFile.single('file'),
      createEventValidator,
      uploadToSupabase,
      createEventController,
    )
    .delete('/event/:id', deleteEventController)
    .put('/event/:id', editEventController)

  return router
}
