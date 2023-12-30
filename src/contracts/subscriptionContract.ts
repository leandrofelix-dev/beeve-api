import { z } from 'zod'

export const subscription = z.object({
  idEvent: z.string().uuid(),
  idUser: z.string().uuid(),
})
