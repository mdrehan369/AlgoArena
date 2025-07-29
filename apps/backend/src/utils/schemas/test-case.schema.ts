
import { z } from 'zod'

export const TestCaseSchema = z.object({
  id: z.number(),
  problemId: z.number(),
  input: z.string(),
  output: z.string(),
  hidden: z.boolean().default(false),
})
