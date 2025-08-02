import { FastifySchema } from "fastify";
import createResponseSchema from "../../utils/createResponseSchema.js";

export const GetBasicStatsSchema: FastifySchema = {
    description: "Get basic stats for a user",
    tags: ["Stats"],
    summary: "Get the basic stats",
    response: {
        200: createResponseSchema({
            type: 'object',
            required: ["problemsSolved", "totalAttempts", "globalRank"],
            properties: {
                problemsSolved: { type: 'number' },
                totalAttempts: { type: 'number' },
                globalRank: { type: 'number' }
            }
        })
    }
}
