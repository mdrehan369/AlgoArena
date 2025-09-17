import { client } from "./client.js";

export async function initializeKafka() {
  const admin = client.admin();
  try {
    client.logger().info("Admin connecting");
    await admin.connect();

    const prevTopics = await admin.listTopics();

    if (
      !prevTopics.find(
        (val) => val == "execution-requests" || val == "execution-responses",
      )
    ) {
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
    } else {
      client.logger().info("Topics already created!");
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.logger().info("Admin disconnecting");
    admin.disconnect();
  }
}
