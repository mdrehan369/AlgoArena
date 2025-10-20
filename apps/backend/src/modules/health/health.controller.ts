import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import {
    checkDbHealth,
    checkExternalServiceHealth,
    checkKafkaHealth,
    HealthStatus,
} from '../../utils/health.js'
import type { EnvConfig } from '../../config/env.config.js'

export const healthController: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.get(
        '/live',
        { schema: { tags: ['Health'] } },
        async (req: FastifyRequest, reply: FastifyReply) => {
            return reply.status(200).send({
                success: true,
                message: 'Service is live!',
                status: 'OK',
                uptime: process.uptime().toFixed(1),
                timestamp: new Date().toISOString(),
            })
        }
    )

    fastify.get(
        '/ready',
        { schema: { tags: ['Health'] } },
        async (req: FastifyRequest, reply: FastifyReply) => {
            const response = {
                status: 'UP',
                success: true,
                message: 'Ready scan done',
                uptime: process.uptime().toFixed(1),
                timestamp: new Date().toISOString(),
                services: {
                    database: {},
                    frontend: {},
                    kafka: {},
                    containers: [] as HealthStatus[],
                },
            }

            const frontendHealthEndpoint = `${fastify.getEnvs<EnvConfig>().FRONTEND_URL}/api/health/live`

            const databaseStatus = await checkDbHealth(fastify.prisma)
            const kafkaStatus = await checkKafkaHealth()
            const frontendStatus = await checkExternalServiceHealth(frontendHealthEndpoint)
            const containerStatus = await fastify.dockerManager.healthCheck()

            if (
                [databaseStatus, frontendStatus, kafkaStatus].find(
                    (service) => service.status !== 'UP'
                )
            )
                response.status = 'DOWN'

            response.services.database = databaseStatus
            response.services.frontend = frontendStatus
            response.services.kafka = kafkaStatus
            response.services.containers.push(...containerStatus)

            return reply.status(200).send(response)
        }
    )

    done()
}
