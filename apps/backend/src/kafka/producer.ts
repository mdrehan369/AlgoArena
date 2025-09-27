import { Language, Problem } from "@repo/db";
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
    await this.producer.disconnect();
  }

  async sendExecutionRequests(params: {
    code: string;
    language: Language;
    problemId: Problem["id"];
    id: string;
  }) {
    try {
      await this.producer.send({
        topic: "execution-requests",
        timeout: 30000,
        messages: [
          {
            key: params.id,
            value: JSON.stringify({
              ...params,
            }),
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
