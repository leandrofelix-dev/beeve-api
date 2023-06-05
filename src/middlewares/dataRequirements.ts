import { z } from 'zod'

export const event = z.object({
  name: z.string().min(5).max(50),
  location: z.string().min(10).max(100),
  description: z.string().min(20).max(280),
  maxParticipants: z.string().min(1),
  date: z.string().datetime(),
})

export const registration = z.object({
  idEvent: z.string().uuid(),
  idUser: z.string().uuid(),
})

export const user = z.object({
  firstName: z.string().min(2).max(12),
  lastName: z.string().min(3).max(40),
  age: z.number().min(14).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  passwordConfirmation: z.string().min(8).max(20),
  isLinkedToIfce: z.boolean(),
  course: z.string().min(2).max(40).nullable(),
  semester: z.number().min(1).max(8).nullable(),
})
