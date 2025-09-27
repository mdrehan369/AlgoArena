import { client } from "./client";
import fp from "fastify-plugin";
import { Consumer } from "kafkajs";

export default fp(async (fastify, _opts) => {
  const consumer = client.consumer({
    groupId: "consumer-group-2",
  });

  client.logger().info("Consumer connecting...");
  await consumer.connect();
  await consumer.subscribe({ topics: ["execution-responses"] });

  fastify.decorate("kafkaConsumer", consumer);

  consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      client.logger().info("Incoming Message: ", {
        key: message.key?.toString(),
        value: message.value?.toString(),
        headers: message.headers,
        partition,
      });
      if (!message.value) return;

      const data = JSON.parse(message.value.toString());
      const reply = fastify.clientMap.getClient(
        message.key?.toString() || "0000",
      );
      if (!reply) return;

      reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    },
  });

  client.logger().info("Consumer listening...");
});

declare module "fastify" {
  interface FastifyInstance {
    kafkaConsumer: Consumer;
  }
}
