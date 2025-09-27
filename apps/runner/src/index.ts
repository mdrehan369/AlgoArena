import Fastify from "fastify";
import { config } from "dotenv";
import kafkaPlugin from "./plugins/kafka.plugin.js";

config();

const fastify = Fastify({
  ajv: {
    customOptions: {
      coerceTypes: true,
    },
  },
  logger: true,
});

fastify.get(
  "/",
  {
    schema: {
      description: "Get the welcome message!",
      tags: ["Root"],
      summary: "Root endpoint",
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },
  async () => {
    return {
      message: "Hello from the server!",
    };
  },
);

await fastify.register(kafkaPlugin);

const start = async () => {
  try {
    fastify.ready(async (err) => {
      if (err) throw err;
      const PORT = 6001;
      const HOST = "0.0.0.0";
      await fastify.listen({ port: PORT, host: HOST });
      fastify.log.info(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
