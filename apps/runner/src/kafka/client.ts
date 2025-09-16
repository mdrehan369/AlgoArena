import { Kafka } from "kafkajs";

export const client = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "myApp",
  connectionTimeout: 3000,
  requestTimeout: 25000,
});
