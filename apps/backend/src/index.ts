import Fastify from "fastify"
import fastifyMultipart from "@fastify/multipart"
import swaggerui from "@fastify/swagger-ui"
import swagger from "@fastify/swagger"
import fastifyEnv from "@fastify/env"
import { config } from "dotenv"
import { EnvConfig, envOptions } from "./config/env.config.js"
import logger from "./config/logger.config.js"
import { swaggerConfig, swaggerUiConfig } from "./config/swagger.config.js"
import { problemController } from "./modules/problems/problem.controller.js"
import prismaPlugin from "./plugins/prisma.js"
import cors from "@fastify/cors"
import cookies from "@fastify/cookie"
import authPlugin from "./plugins/auth.plugin.js"
import queryParserPlugin from "./plugins/queryParser.plugin.js"
import { statController } from "./modules/stats/stat.controller.js"
import { runnerController } from "./modules/runner/runner.controller.js"

config()
const fastify = Fastify({
  logger: logger,
  ajv: {
    customOptions: {
      coerceTypes: true
    }
  }
})

await fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
})

await fastify.register(fastifyEnv, envOptions)

await fastify.register(swagger, swaggerConfig)

await fastify.register(swaggerui, swaggerUiConfig)

await fastify.register(cookies, {
  secret: fastify.getEnvs<EnvConfig>().COOKIE
})

await fastify.register(queryParserPlugin)

await fastify.register(prismaPlugin)

await fastify.register(cors, {
  origin: fastify.getEnvs<EnvConfig>().FRONTEND_URL, // your frontend origin
  credentials: true, // allow cookies to be sent
})

await fastify.register(authPlugin, { prefix: "/api" })

fastify.get("/", {
  schema: {
    description: "Get the welcome message",
    tags: ["Root"],
    summary: "Root endpoint",
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          message: { type: "string" }
        }
      }
    }
  }
}, async () => {
  return {
    message: "Hello from the server!"
  }
})

fastify.register(problemController, { prefix: '/api/v1/problems' })
fastify.register(statController, { prefix: '/api/v1/stats' })
fastify.register(runnerController, { prefix: '/api/v1/runner' })


const start = async () => {
  try {
    fastify.ready(async (err) => {
      if (err) throw err
      const PORT = fastify.getEnvs<EnvConfig>().PORT
      await fastify.listen({ port: PORT })
      fastify.log.info(`Server is listening on port ${PORT}`)
    })
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
