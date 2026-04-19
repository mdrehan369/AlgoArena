import { initializeKafka } from '@/kafka/admin.js'
import { KafkaProducer } from '@/kafka/producer.js'
import fp from 'fastify-plugin'

export default fp(async (fastify, _opts) => {
    fastify.log.info('Initializing Kafka And Making Topics')
    await initializeKafka()
    fastify.log.info('Kafka Initialized Successfully!')

    const producer = new KafkaProducer()
    fastify.decorate('kafkaProducer', producer)
})

declare module 'fastify' {
    interface FastifyInstance {
        kafkaProducer: KafkaProducer
    }
}
