
import { z } from 'zod'

export const ExampleTestCaseSchema = z.object({
  id: z.number(),
  problemId: z.number(),
  input: z.string(),
  output: z.string(),
  description: z.string(),
})
