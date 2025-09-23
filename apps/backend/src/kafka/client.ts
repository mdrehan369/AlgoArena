import { Kafka } from "kafkajs";

export const client = new Kafka({
  brokers: ["localhost:9094"],
  clientId: "algoarena-backend",
  connectionTimeout: 3000,
  requestTimeout: 25000,
});
