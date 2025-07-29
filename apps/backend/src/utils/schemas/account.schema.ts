
import { z } from 'zod'

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.date().optional().nullable(),
  refreshTokenExpiresAt: z.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
