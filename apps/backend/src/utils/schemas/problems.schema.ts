import { z } from 'zod'
import { LevelEnum, TopicEnum } from './enums.ts'

export const ProblemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  constraints: z.array(z.string()),
  topics: z.array(TopicEnum),
  level: LevelEnum,
  acceptanceRate: z.number(),
  createdAt: z.date(),
})

export const ProblemSchemaWithUserStatus = ProblemSchema.extend({
    userStatus: z.enum(['solved', 'attempted', 'not-attempted']),
})


