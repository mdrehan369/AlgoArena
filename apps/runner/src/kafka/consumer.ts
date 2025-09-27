import { RunnerService } from "@/modules/executor/executor.service.js";
import { client } from "./client.js";
import { prisma } from "@repo/db";
import { KafkaProducer } from "./producer.js";
import { ProblemService } from "@/modules/problems/problem.service.js";

export async function kafkaConsumerInit() {
  try {
    const consumer = client.consumer({
      groupId: "consumer-group-1",
    });

    client.logger().info("Consumer connecting...");
    await consumer.connect();
    client
      .logger()
      .info(
        `Consumer with client ID ${process.env.KAFKA_CLIENT_ID} with broker ${process.env.KAFKA_BROKER_HOST}`,
      );

    await consumer.subscribe({ topics: ["execution-requests"] });

    const runnerService = new RunnerService(prisma);
    const problemService = new ProblemService(prisma);
    const kafkaProducer = new KafkaProducer();
    await kafkaProducer.connect();

    consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        console.log("Incoming Message: ", {
          key: message.key?.toString(),
          value: message.value?.toString(),
          headers: message.headers,
        });

        if (!message.value) return;
        const { code, language, problemId, action, customTestCases, userId } =
          JSON.parse(message.value.toString());

        let response = null;
        if (!action || action == "TEST")
          response = await runnerService.testCode(code, problemId, language);
        else if (action == "CUSTOM")
          response = await runnerService.testCodeAgainstCustomTestCases(
            code,
            problemId,
            language,
            customTestCases || [],
          );
        else
          response = await problemService.runSubmitProblem(
            userId,
            code,
            problemId,
            language,
          );

        console.log(response);

        await kafkaProducer.sendExecutionResponses(
          { ...response, action: action || "TEST" },
          message.key?.toString() || "0000",
        );
      },
    });

    client.logger().info("Consumer listening...");
  } catch (error) {
    console.log(error);
  }
}
