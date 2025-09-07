import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { RunnerService } from "./runner.service.js";
import {
  RunCustomTestSchema,
  RunTestSchema,
} from "@/schemas/runner/runner.post.js";
import { CustomTestCase, Language, Problem } from "@repo/db";

export const runnerController: FastifyPluginCallback = (
  instance,
  opts,
  done,
) => {
  const fastify = instance as FastifyInstance & {
    runnerService: RunnerService;
  };

  fastify.decorate("runnerService", new RunnerService(fastify.prisma));

  fastify.post(
    "/test",
    { schema: RunTestSchema },
    async (
      request: FastifyRequest<{
        Body: {
          code: string;
          language: Language;
          problemId: Problem["id"];
        };
      }>,
      reply: FastifyReply,
    ) => {
      const { code, language, problemId } = request.body;

      if (code == "")
        return reply
          .status(400)
          .send({ success: false, message: "No code given" });

      const response = await fastify.runnerService.testCode(
        code,
        Number(problemId),
        language,
      );

      if (!response.success)
        return reply.status(response.errorCode || 400).send(response);
      return response;
    },
  );

  fastify.post(
    "/custom",
    { schema: RunCustomTestSchema },
    async (
      request: FastifyRequest<{
        Body: {
          code: string;
          language: Language;
          problemId: Problem["id"];
          customTestCases: CustomTestCase[];
        };
      }>,
      reply,
    ) => {
      const { code, customTestCases, language, problemId } = request.body;

      if (code == "")
        return reply
          .status(400)
          .send({ success: false, message: "No code given" });

      const response =
        await fastify.runnerService.testCodeAgainstCustomTestCases(
          code,
          Number(problemId),
          language,
          customTestCases,
        );
      if (!response.success)
        return reply.status(response.errorCode || 400).send(response);
      return response;
    },
  );

  done();
};
