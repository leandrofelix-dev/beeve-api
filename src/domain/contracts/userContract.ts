import { z } from 'zod'

export const user = z
  .object({
    fullName: z.string().min(10).max(100),
    // dateOfBirth: z.string(),
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
