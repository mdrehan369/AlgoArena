import { initializeKafka } from "@/kafka/admin";
import { KafkaProducer } from "@/kafka/producer";
import fp from "fastify-plugin";

export default fp(async (fastify, _opts) => {
  fastify.log.info("Initializing Kafka And Making Topics");
  await initializeKafka();
  fastify.log.info("Kafka Initialized Successfully!");

  const producer = new KafkaProducer();
  fastify.decorate("kafkaProducer", producer);
});

declare module "fastify" {
  interface FastifyInstance {
    kafkaProducer: KafkaProducer;
  }
}
