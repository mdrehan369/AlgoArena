import { FastifyReply } from "fastify";

export class ClientMap {
  private map: Map<string, FastifyReply>;

  constructor() {
    this.map = new Map();
  }

  setClient(id: string, reply: FastifyReply) {
    this.map.set(id, reply);
  }

  getClient(id: string) {
    return this.map.get(id);
  }

  hasClient(id: string) {
    return this.map.has(id);
  }

  deleteClient(id: string) {
    this.map.delete(id);
  }
}
