
import { z } from 'zod'

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
})
