import { kafkaConsumerInit } from "@/kafka/consumer.js";
import fp from "fastify-plugin";

export default fp(async (fastify, _opts) => {
  fastify.log.info("Initializing Kafka Consumer");
  await kafkaConsumerInit();
  fastify.log.info("Kafka Initialized Successfully!");
});
