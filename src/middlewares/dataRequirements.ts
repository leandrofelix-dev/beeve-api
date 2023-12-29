import { z } from 'zod'

export const event = z.object({
  name: z.string().min(5).max(50),
  address: z.string().min(10).max(100),
  description: z.string().min(20).max(280),
  maxParticipants: z.string().min(1),
  date: z.string().datetime(),
})

export const registration = z.object({
  idEvent: z.string().uuid(),
  idUser: z.string().uuid(),
})

export const user = z
  .object({
    fullName: z.string().min(10).max(100),
    dateOfBirth: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    passwordConfirmation: z.string().min(8).max(20),
    isExternal: z.boolean(),
    institutionalCode: z.string().nullable(),
  })
  .refine(
    (data) =>
      (data.isExternal && data.institutionalCode == null) ||
      (!data.isExternal && data.institutionalCode != null),
  )
