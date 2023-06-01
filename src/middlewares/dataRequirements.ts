import { z } from 'zod'

export const event = z.object({
  name: z.string().min(5).max(50),
  location: z.string().min(10).max(100),
  description: z.string().min(20).max(280),
  maxParticipants: z.number().int().positive(),
  date: z.string().datetime(),
})

export const registration = z.object({
  idEvent: z.string().uuid(),
  idUser: z.string().uuid(),
})
