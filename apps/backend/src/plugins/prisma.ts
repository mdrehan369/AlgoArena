import fp from 'fastify-plugin'
import { prisma } from "@repo/db"

// It will update the global fastify instance
export default fp(async (fastify, _opts) => {
  fastify.decorate('prisma', prisma)

  fastify.addHook('onClose', async (app) => {
    await app.prisma.$disconnect()
  })
})

declare module 'fastify' {
  interface FastifyInstance {
    prisma: typeof prisma
  }
}
