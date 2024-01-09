import { z } from 'zod'

export const event = z.object({
  name: z.string().min(5).max(50),
  address: z.string().min(10).max(100),
  description: z.string().min(20).max(280),
  maxParticipants: z.string().min(1),
  // date: z.string().datetime(),
})
