import Fastify from "fastify";
import fastifyMultipart from "@fastify/multipart";
import { config } from "dotenv";
import cors from "@fastify/cors";
import cookies from "@fastify/cookie";

config();
const fastify = Fastify({
  ajv: {
    customOptions: {
      coerceTypes: true,
    },
  },
  logger: true,
});

await fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

await fastify.register(cookies, {
  secret: "secret",
});

await fastify.register(cors, {
  origin: ["http://localhost:3000", "http://web-dev:3000"], // your frontend origin
  credentials: true, // allow cookies to be sent
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
