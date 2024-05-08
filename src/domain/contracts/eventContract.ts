import { z } from 'zod'
import { zodMessagesPTBR } from '../../../shared/errors-messages'

const isValidDateString = (v: string): boolean => !isNaN(Date.parse(v))
const isValidBooleanString = (v: string): boolean =>
  v === 'true' || v === 'false'

export const event = z.object({
  name: z
    .string()
    .min(5, {
      message: zodMessagesPTBR.minLength('nome', 5),
    })
    .max(50, {
      message: zodMessagesPTBR.maxLength('nome', 50),
    }),
  description: z
    .string()
    .min(20, {
      message: zodMessagesPTBR.minLength('descrição', 20),
    })
    .max(280, {
      message: zodMessagesPTBR.maxLength('descrição', 280),
    }),
  location: z
    .string()
    .min(10, {
      message: zodMessagesPTBR.minLength('localização', 10),
    })
    .max(100, {
      message: zodMessagesPTBR.maxLength('localização', 100),
    }),
  startDateTime: z.string().refine(isValidDateString, {
    message: zodMessagesPTBR.validDateTime('startDateTime'),
  }),
  endDateTime: z.string().refine(isValidDateString, {
    message: zodMessagesPTBR.validDateTime('endDateTime'),
  }),
  maxParticipants: z.number().min(1, {
    message: zodMessagesPTBR.minNumber('número máximo de participantes', 1),
  }),
  isPublic: z.string().refine(isValidBooleanString, {
    message: zodMessagesPTBR.booleanValue('isPublic'),
  }),
  isRemote: z.string().refine(isValidBooleanString, {
    message: zodMessagesPTBR.booleanValue('isRemote'),
  }),
})
