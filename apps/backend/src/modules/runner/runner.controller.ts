import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import {
  RunCustomTestSchema,
  RunTestSchema,
} from "@/schemas/runner/runner.post.js";
import { CustomTestCase, Language, Problem } from "@repo/db";
import { EnvConfig } from "@/config/env.config.js";

export const runnerController: FastifyPluginCallback = (
  fastify,
  opts,
  done,
) => {
  fastify.post(
    "/test",
    { schema: RunTestSchema },
    async (
      request: FastifyRequest<{
        Body: {
          code: string;
          language: Language;
          problemId: Problem["id"];
          id: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      const { code, id } = request.body;

      if (code == "")
        return reply
          .status(400)
          .send({ success: false, message: "No code given" });

      const partition = await fastify.dockerManager.assignTask();

      const data = await fastify.kafkaProducer.producer.send({
        topic: "execution-requests",
        messages: [
          {
            key: id,
            value: JSON.stringify({ ...request.body, action: "TEST" }),
            partition: partition || 0,
          },
        ],
      });

      fastify.log.info(data);
      fastify.log.info(partition);

      return reply.send({
        success: true,
        message: `Execution Request Send With ID ${id}!`,
      });
    },
  );

  fastify.post(
    "/custom",
    { schema: RunCustomTestSchema },
    async (
      request: FastifyRequest<{
        Body: {
          id: string;
          code: string;
          language: Language;
          problemId: Problem["id"];
          customTestCases: CustomTestCase[];
        };
      }>,
      reply,
    ) => {
      const { code, id } = request.body;

      if (code == "")
        return reply
          .status(400)
          .send({ success: false, message: "No code given" });

      await fastify.kafkaProducer.producer.send({
        topic: "execution-requests",
        messages: [
          {
            key: id,
            value: JSON.stringify({ ...request.body, action: "CUSTOM" }),
          },
        ],
      });

      return reply.send({
        success: true,
        message: `Execution Request Send With ID ${id}!`,
      });
    },
  );

  // SSE route
  fastify.get(
    "/events/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const { id } = request.params;
      fastify.log.debug(`events me aaya h with id ${id}`);

      if (fastify.clientMap.hasClient(id))
        return reply.send({ success: false, message: "Already subscribed!" });

      reply.raw.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin":
          fastify.getEnvs<EnvConfig>().FRONTEND_URL,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      });

      reply.hijack();

      // reply.raw.write("data: {jobId: \"1000\"}")
      fastify.clientMap.setClient(id, reply);

      // cleanup when client disconnects
      request.raw.on("close", async () => {
        fastify.clientMap.deleteClient(id);
        fastify.log.debug(`closing client ${id}`);
      });

      // return reply // important to keep the connection open
    },
  );

  done();
};
