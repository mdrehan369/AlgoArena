
import { z } from 'zod'

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string(),
})
