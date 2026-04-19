import { ClientMap } from '@/utils/ClientMap.js'
import fp from 'fastify-plugin'

export default fp(async (fastify, _opts) => {
    fastify.decorate('clientMap', new ClientMap())
})

declare module 'fastify' {
    interface FastifyInstance {
        clientMap: ClientMap
    }
}
