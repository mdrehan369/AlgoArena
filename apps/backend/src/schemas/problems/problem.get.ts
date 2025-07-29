import { FastifySchema } from "fastify";
import { ProblemSchemaWithUserStatus } from "../../utils/schemas/problems.schema.ts";
import { z } from "zod";
import { Level, Topic } from "@repo/db"
import createResponseSchema from "../../utils/createResponseSchema.ts";

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
            level: { type: 'string', description: "Search with problem level", enum: Object.keys(Level) },
            status: { type: 'string', description: "Search with problem status", enum: ["solved", "attempted", "not-attempted"] },
            topics: { type: 'array', description: "Search with problem topics", items: { type: 'string', enum: Object.values(Topic) } }
        }
    },
    response: {
        200: z.array(ProblemSchemaWithUserStatus)
    }
}
