import { z } from 'zod'

export const event = z.object({
  name: z.string().min(5).max(50),
  location: z.string().min(10).max(100),
  description: z.string().min(20).max(280),
  maxParticipants: z.number().int().positive(),
  date: z.string().datetime(),
})

export const user = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(20),
})
