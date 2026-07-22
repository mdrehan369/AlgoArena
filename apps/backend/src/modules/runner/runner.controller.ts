import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import { RunCustomTestSchema, RunTestSchema } from '@/schemas/runner/runner.post.js'
import { CustomTestCase, Language, Problem } from '@repo/db'
import { EnvConfig } from '@/config/env.config.js'

export const runnerController: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.post(
        '/test',
        { schema: RunTestSchema },
        async (
            request: FastifyRequest<{
                Body: {
                    code: string
                    language: Language
                    problemId: Problem['id']
                    id: string
                }
            }>,
            reply: FastifyReply
        ) => {
            const { code, id } = request.body

            if (code == '')
                return reply.status(400).send({ success: false, message: 'No code given' })

            const partition = await fastify.dockerManager.assignTask()

            const data = await fastify.kafkaProducer.producer.send({
                topic: 'execution-requests',
                messages: [
                    {
                        key: id,
                        value: JSON.stringify({ ...request.body, action: 'TEST' }),
                        partition: partition || 0,
                    },
                ],
            })

            fastify.log.info(data)
            fastify.log.info(partition)

            return reply.send({
                success: true,
                message: `Execution Request Send With ID ${id}!`,
            })
        }
    )

    fastify.post(
        '/custom',
        { schema: RunCustomTestSchema },
        async (
            request: FastifyRequest<{
                Body: {
                    id: string
                    code: string
                    language: Language
                    problemId: Problem['id']
                    customTestCases: CustomTestCase[]
                }
            }>,
            reply
        ) => {
            const { code, id } = request.body

            if (code == '')
                return reply.status(400).send({ success: false, message: 'No code given' })

            await fastify.kafkaProducer.producer.send({
                topic: 'execution-requests',
                messages: [
                    {
                        key: id,
                        value: JSON.stringify({ ...request.body, action: 'CUSTOM' }),
                    },
                ],
            })

            return reply.send({
                success: true,
                message: `Execution Request Send With ID ${id}!`,
            })
        }
    )

    // SSE route
    fastify.get('/events/:id', (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
        const { id } = request.params

        fastify.log.fatal(`SSE connection requested for ${id}`)

        if (fastify.clientMap.hasClient(id)) {
            reply.code(409).send({
                success: false,
                message: 'Already subscribed!',
            })

            return
        }

        reply.hijack()

        reply.raw.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',

            // CORS
            'Access-Control-Allow-Origin': fastify.getEnvs<EnvConfig>().FRONTEND_URL,
            'Access-Control-Allow-Credentials': 'true',
        })

        reply.raw.write(
            `event: connected\ndata: ${JSON.stringify({
                id,
            })}\n\n`
        )

        fastify.clientMap.setClient(id, reply)

        const heartbeat = setInterval(() => {
            if (!reply.raw.destroyed) {
                reply.raw.write(': heartbeat\n\n')
            }
        }, 15000)

        request.raw.on('close', () => {
            clearInterval(heartbeat)

            fastify.clientMap.deleteClient(id)

            fastify.log.fatal(`SSE client disconnected: ${id}`)
        })
    })
    done()
}
