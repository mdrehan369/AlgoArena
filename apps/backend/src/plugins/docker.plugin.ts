import { DockerManager } from "@/utils/docker";
import fp from "fastify-plugin";

export default fp(async (fastify, _opts) => {
  fastify.log.info("Initializing Docker Manager And Starting Containers");
  const dockerManager = new DockerManager();
  await dockerManager.createContainers(4);
  fastify.decorate("dockerManager", dockerManager);
  fastify.log.info(await dockerManager.getContainers());
});

declare module "fastify" {
  interface FastifyInstance {
    dockerManager: DockerManager;
  }
}
