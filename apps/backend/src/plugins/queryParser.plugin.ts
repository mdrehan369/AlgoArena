import fp from 'fastify-plugin'
import qs from "qs"

// It will update the global fastify instance
export default fp(async (fastify, _opts) => {
    fastify.addHook('onRequest', (request, reply, done) => {
        const [url, rawQuery] = request.url.split('?')
        if (rawQuery) {
            request.query = qs.parse(rawQuery)
        }
        done()
    })
})
