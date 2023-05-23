import { z } from 'zod'

export const event = z.object({
  name: z.string().min(3).max(40),
  location: z.string().min(8).max(100),
  description: z.string().min(10).max(255),
  maxParticipants: z.number().int().positive(),
})
