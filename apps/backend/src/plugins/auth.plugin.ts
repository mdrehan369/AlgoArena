import fp from 'fastify-plugin'
import { User } from "@repo/db"

// It will update the global fastify instance
export default fp(async (fastify, _opts) => {
    fastify.decorate('user', null)
    fastify.addHook('onRequest', async (request, reply) => {
        const token = request.cookies["better-auth.session_token"]
        fastify.log.info(`Received token: ${token ? 'present' : 'not present'}`)
        if (token) {
            const session = await fastify.prisma.session.findFirst({ where: { token: token.split('.')[0] } })
            if (!session) {
                fastify.user = null
            } else {
                const user = await fastify.prisma.user.findFirst({ where: { id: session.userId } })
                fastify.user = user
                fastify.log.info(`Authenticated user: ${user?.name} (${user?.id})`)
            }
        }

    })
})

declare module 'fastify' {
    interface FastifyInstance {
        user: User | null
    }
}
