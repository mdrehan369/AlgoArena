import Fastify from "fastify"
import fastifyMultipart from "@fastify/multipart"
import swaggerui from "@fastify/swagger-ui"
import swagger from "@fastify/swagger"
import fastifyEnv from "@fastify/env"
import { config } from "dotenv"
import { EnvConfig, envOptions } from "./config/env.config.ts"
import logger from "./config/logger.config.ts"
import { swaggerConfig, swaggerUiConfig } from "./config/swagger.config.ts"

config()
const fastify = Fastify({
    logger: logger
})

fastify.register(fastifyMultipart, {
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }
})

fastify.register(fastifyEnv, envOptions)

fastify.register(swagger, swaggerConfig)

fastify.register(swaggerui, swaggerUiConfig)

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



const start = async () => {
    try {
        fastify.ready(async (err) => {
            if(err) throw err
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
