import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { GetAllProblemsSchema, GetProblemBySlug } from "../../schemas/problems/problem.get.js";
import { ProblemService } from "./problem.service.js";
import { Language, Level, Topic } from "@repo/db";
import { SubmitProblemSchema } from "@/schemas/problems/problem.post.js";

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
    const problems = await fastify.problemService.getAllProblems(fastify.user.id, page, limit, status, topics, search, level)

    return reply.send({ data: problems });
  });

  fastify.get("/problem/:slug", {
    schema: GetProblemBySlug,
  }, async (request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {

    const slug = request.params.slug
    if (!slug) {
      fastify.log.error("No slug given!")
      return reply.status(400).send({ success: false, message: "No slug found" })
    }

    const response = await fastify.problemService.getProblemBySlug(slug)
    if (!response.success) {
      fastify.log.error("No problem found!")
      return reply.status(404).send({ success: false, message: "No problem found!" })
    }

    return reply.status(200).send(response)

  })

  fastify.post("/problem/submit", { schema: SubmitProblemSchema },
    async (request: FastifyRequest<{
      Body: {
        language: Language,
        problemId: number,
        code: string
      }
    }>, reply) => {
      const { code, problemId, language } = request.body
      if (!fastify.user) {
        return reply.status(400).send({ success: false, message: "Authenticate first!" })
      }

      return await fastify.problemService.runSubmitProblem(fastify.user.id, code, problemId, language)
    }
  )

  done();
}
