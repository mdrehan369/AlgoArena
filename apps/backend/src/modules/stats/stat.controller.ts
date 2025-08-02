import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { StatService } from "./stat.service.js";
import { GetBasicStatsSchema } from "../../schemas/stats/stat.get.js";

export const statController: FastifyPluginCallback = (instance, _opts, done) => {

    const fastify = instance as FastifyInstance & {
        statService: StatService
    }

    fastify.decorate("statService", new StatService(fastify.prisma))

    fastify.get("/",
        {
            schema: GetBasicStatsSchema
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            if (!fastify.user) {
                fastify.log.warn("Unauthorized access attempt to stats endpoint");
                return reply.status(401).send({ error: "Unauthorized" });
            }

            fastify.log.info(`Fetching all the basic stats for user ${fastify.user.id}`)
            const stats = await fastify.statService.getBasicStats(fastify.user.id)
            return reply.send({
                data: stats
            })
        }
    )

    done()

}
