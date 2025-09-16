import { client } from "./client.js";

export async function initializeKafka() {
  try {
    const admin = client.admin();
    client.logger().info("Admin connecting");
    await admin.connect();

    const topics = await admin.createTopics({
      topics: [
        {
          topic: "execution-requests",
          numPartitions: 4,
        },
        {
          topic: "execution-responses",
          numPartitions: 4,
        },
      ],
    });

    if (topics) client.logger().info("Topic created successfully");
    else client.logger().info("Error while creating topic");

    client.logger().info("Admin disconnecting");
    admin.disconnect();
  } catch (error) {
    console.log(error);
  }
}
