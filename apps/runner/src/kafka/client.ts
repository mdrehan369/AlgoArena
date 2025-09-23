import { Kafka } from "kafkajs";

export const client = new Kafka({
  // brokers: [`${process.env.KAFKA_BROKER_HOST || "localhost:9092"}`],
  brokers: ["algoarenaKafka:9092"],
  clientId: process.env.KAFKA_CLIENT_ID,
  connectionTimeout: 3000,
  requestTimeout: 25000,
});
