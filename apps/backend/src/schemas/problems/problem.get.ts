import { FastifySchema } from "fastify";
import { ProblemSchema } from "../../utils/schemas/index.js";
import createResponseSchema from "../../utils/createResponseSchema.js";

export const GetAllProblemsSchema: FastifySchema = {
    description: "Get a list of problems",
    tags: ["Problems"],
    summary: "List all problems",
    querystring: {
        type: 'object',
        required: [],
        properties: {
            page: { type: 'integer', default: 1, description: 'Page number for pagination', minimum: 1 },
            limit: { type: 'integer', default: 15, description: 'Number of problems per page', minimum: 1 },
            search: { type: 'string', default: "", description: "Search with problem name" },
            level: { type: 'string', description: "Search with problem level" },
            status: { type: 'string', description: "Search with problem status", enum: ["solved", "attempted", "not-attempted"] },
            topics: { type: 'array', description: "Search with problem topics", items: { type: 'string' } }
        }
    },
    response: {
        200: createResponseSchema({
            type: "array",
            items: { ...ProblemSchema }
        })
    }
}
