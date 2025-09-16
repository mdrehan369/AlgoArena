import { FastifyReply } from "fastify";
import { createClient } from "redis";

class RedisHelper {
  client;

  constructor(url?: string) {
    this.client = createClient({ url });
  }

  async setClient(id: string, reply: FastifyReply) {
    await this.client.set(id, JSON.stringify(reply));
  }

  async deleteClient(id: string) {
    await this.client.del(id);
  }

  async getClient(id: string) {
    return await this.client.get(id);
  }

  async hasClient(id: string) {
    return await this.client.exists(id);
  }

  async connect() {
    if (!this.client.isOpen) this.client.connect();
  }
}

// export const redisHelper = new RedisHelper()
