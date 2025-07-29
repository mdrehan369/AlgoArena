import { z } from "zod"

const baseResponseSchema = z.object({
    success: z.boolean().default(true),
    message: z.string()
})

export default baseResponseSchema
