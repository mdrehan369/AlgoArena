import { FastifySwaggerUiOptions } from "@fastify/swagger-ui"
import { FastifyRegisterOptions } from "fastify"

export const swaggerUiConfig: FastifyRegisterOptions<FastifySwaggerUiOptions> = {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function(_request, _reply, next) { next() },
        preHandler: function(_request, _reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => { return swaggerObject },
    transformSpecificationClone: true
}

export const swaggerConfig = {
    swagger: {
        info: {
            title: "AlgoArena API",
            description: "API documentation for AlgoArena backend",
            version: "1.0.0"
        }
    }
}
