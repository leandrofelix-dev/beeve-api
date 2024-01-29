import { z } from 'zod'

export const event = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(20).max(280),
  location: z.string().min(10).max(100),
  dateTime: z.date().min(new Date()),
  maxParticipants: z.number().min(1),
  isPublic: z.string(),
})
