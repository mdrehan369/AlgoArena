import { Kafka } from 'kafkajs'

export const client = new Kafka({
    brokers: ['localhost:29092'],
    clientId: 'algoarena-backend',
    connectionTimeout: 3000,
    requestTimeout: 25000,
})
