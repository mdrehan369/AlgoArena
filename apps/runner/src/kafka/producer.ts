import { client } from "./client.js";
import { Partitioners, Producer } from "kafkajs";

export class KafkaProducer {
  producer: Producer;

  constructor() {
    client.logger().info("Producer connecting...");
    this.producer = client.producer({
      allowAutoTopicCreation: false,
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    this.producer.connect().then((_val) => {
      client.logger().info("Producer connected!");
    });
  }

  async disconnect() {
    await client.admin().disconnect();
  }

  async sendExecutionResponses(data: Record<string, any>, id: string) {
    try {
      await this.producer.send({
        topic: "execution-responses",
        timeout: 30000,
        messages: [
          {
            key: id,
            value: JSON.stringify({
              ...data,
            }),
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
