import Fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import swaggerui from '@fastify/swagger-ui'
import swagger from '@fastify/swagger'
import fastifyEnv from '@fastify/env'
import { config } from 'dotenv'
import { EnvConfig, envOptions } from './config/env.config.js'
import logger from './config/logger.config.js'
import { swaggerConfig, swaggerUiConfig } from './config/swagger.config.js'
import { problemController } from './modules/problems/problem.controller.js'
import prismaPlugin from './plugins/prisma.js'
import cors from '@fastify/cors'
import cookies from '@fastify/cookie'
import authPlugin from './plugins/auth.plugin.js'
import queryParserPlugin from './plugins/queryParser.plugin.js'
import kafkaPlugin from './plugins/kafka.plugin.js'
import clientMapPlugin from './plugins/clientmap.plugin.js'
import { statController } from './modules/stats/stat.controller.js'
import { runnerController } from './modules/runner/runner.controller.js'
import kafkaConsumerPlugin from './plugins/kafkaConsumer.plugin.js'
import dockerPlugin from './plugins/docker.plugin.js'
import { profileController } from './modules/profile/profile.controller.js'
import imageKitPlugin from './plugins/imageKit.plugin.js'
import { healthController } from './modules/health/health.controller.js'

config()
const fastify = Fastify({
    logger: logger,
    ajv: {
        customOptions: {
            coerceTypes: true,
        },
    },
})

await fastify.register(fastifyMultipart, {
    limits: {
        fileSize: 20 * 1024 * 1024, // 10 MB
    },
})

await fastify.register(fastifyEnv, envOptions)

await fastify.register(swagger, swaggerConfig)

await fastify.register(swaggerui, swaggerUiConfig)

await fastify.register(cookies, {
    secret: fastify.getEnvs<EnvConfig>().COOKIE,
})

await fastify.register(queryParserPlugin)

await fastify.register(prismaPlugin)

await fastify.register(kafkaPlugin)

await fastify.register(clientMapPlugin)

await fastify.register(kafkaConsumerPlugin)

await fastify.register(dockerPlugin)

await fastify.register(imageKitPlugin)

await fastify.register(cors, {
    origin: [
        fastify.getEnvs<EnvConfig>().FRONTEND_URL,
        'http://localhost:3000',
        'http://web-dev:3000',
    ], // your frontend origin
    credentials: true, // allow cookies to be sent
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
})

await fastify.register(authPlugin, { prefix: '/api' })

fastify.get(
    '/',
    {
        schema: {
            description: 'Get the welcome message!',
            tags: ['Root'],
            summary: 'Root endpoint',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    },
    async () => {
        return {
            message: 'Hello from the server!',
        }
    }
)

fastify.register(problemController, { prefix: '/api/v1/problems' })
fastify.register(statController, { prefix: '/api/v1/stats' })
fastify.register(runnerController, { prefix: '/api/v1/runner' })
fastify.register(profileController, { prefix: '/api/v1/profile' })
fastify.register(healthController, { prefix: '/health' })

fastify.addHook('onClose', async (instance) => {
    await instance.dockerManager.cleanup()
    await instance.kafkaConsumer.disconnect()
    await instance.kafkaProducer.disconnect()
})

const start = async () => {
    try {
        fastify.ready(async (err) => {
            if (err) throw err
            const PORT = fastify.getEnvs<EnvConfig>().PORT
            const HOST = fastify.getEnvs<EnvConfig>().HOST
            await fastify.listen({ port: PORT, host: HOST })
            fastify.log.info(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

const exitSignals = ['SIGINT', 'SIGTERM']

for (const signal of exitSignals) {
    process.on(signal, () => {
        console.log('exiting')
        fastify
            .close()
            .then(() => process.exit(1))
            .catch((err) => console.log('Error while exiting', err))
    })
}

start()
