import { Partitioners, Producer } from "kafkajs";
import { client } from "./client.js";

export class KafkaProducer {
  producer: Producer;

  constructor() {
    this.producer = client.producer({
      allowAutoTopicCreation: false,
      createPartitioner: Partitioners.LegacyPartitioner,
    });
  }

  async connect() {
    await this.producer.connect();
    client.logger().info("Producer connected!");
  }

  async sendExecutionResponses(data: Record<string, any>, id: string) {
    try {
      await this.producer.send({
        topic: "execution-responses",
        timeout: 30000,
        messages: [
          {
            key: id,
            value: JSON.stringify({ ...data }),
          },
        ],
      });
    } catch (error) {
      console.error("Producer send error:", error);
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
