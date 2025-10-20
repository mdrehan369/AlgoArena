import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'

export const healthController: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.get('/live', {}, async (req: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({
            success: true,
            message: 'Service is live!',
            status: 'OK',
            uptime: process.uptime().toFixed(1),
            timestamp: new Date().toISOString(),
        })
    })

    done()
}
