import { FastifyInstance, FastifyPluginCallback, FastifyRequest } from "fastify";
import { GetAllProblemsSchema } from "../../schemas/problems/problem.get.ts";
import { ProblemService } from "./problem.service.ts";
import { Level, Topic } from "@repo/db";

export const problemController: FastifyPluginCallback = (instance, opts, done) => {

    const fastify = instance as FastifyInstance & {
        problemService: ProblemService
    }

    fastify.decorate("problemService", new ProblemService(fastify.prisma))

    fastify.get("/", {
        schema: GetAllProblemsSchema
    }, async (request: FastifyRequest<{
        Querystring: {
            page?: number,
            limit?: number,
            search?: string,
            level?: Level,
            status?: "solved" | "attempted" | "not-attempted",
            topics?: Topic[]
        }
    }>, reply) => {

        if (!fastify.user) {
            fastify.log.warn("Unauthorized access attempt to problems endpoint");
            return reply.status(401).send({ error: "Unauthorized" });
        }

        const { level, limit, page, search, status, topics } = request.query

        fastify.log.info("Fetching all problems");
        fastify.log.info(`Params are ${request.query.topics}`)
        const problems = await fastify.problemService.getAllProblems(fastify.user.id, page, limit, status, topics, search, level)

        return reply.send({ data: problems });
    });

    done();
}
