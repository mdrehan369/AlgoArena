import { RunnerService } from "@/modules/executor/executor.service.js";
import { client } from "./client.js";
import { prisma } from "@repo/db";
import { KafkaProducer } from "./producer.js";

export async function kafkaConsumerInit() {
  try {
    const consumer = client.consumer({
      groupId: "consumer-group-1",
    });

    client.logger().info("Consomer connecting...");
    await consumer.connect();
    await consumer.subscribe({ topics: ["execution-requests"] });

    const runnerService = new RunnerService(prisma);
    const kafkaProducer = new KafkaProducer();

    consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        console.log("Incoming Message: ", {
          key: message.key?.toString(),
          value: message.value?.toString(),
          headers: message.headers,
        });
        if (!message.value) return;
        const { code, language, problemId } = JSON.parse(
          message.value.toString(),
        );
        const response = await runnerService.testCode(
          code,
          problemId,
          language,
        );

        console.log(response);

        await kafkaProducer.sendExecutionResponses(
          response,
          message.key?.toString() || "0000",
        );
      },
    });

    client.logger().info("Consumer listening...");
  } catch (error) {
    console.log(error);
  }
}
