
import { z } from 'zod'
import { LanguageEnum } from './enums.ts'

export const SubmittedResultSchema = z.object({
  id: z.number(),
  problemId: z.number(),
  userId: z.string(),
  code: z.string(),
  isAccepted: z.boolean().default(false),
  language: LanguageEnum,
  runtime: z.number(),
  testCasesPassed: z.number().default(0),
  createdAt: z.date(),
})
