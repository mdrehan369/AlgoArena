import { EnvConfig } from "@/config/env.config";
import { ImageKitUtil } from "@/utils/imageKitUtil";
import fp from "fastify-plugin";

export default fp(async (fastify, _opts) => {
  const pubKey = fastify.getEnvs<EnvConfig>().IMAGE_KIT_PUBLIC_KEY;
  const privateKey = fastify.getEnvs<EnvConfig>().IMAGE_KIT_PRIVATE_KEY;

  const imageKitUtil = new ImageKitUtil(pubKey, privateKey);
  fastify.decorate("imageKitUtil", imageKitUtil);
});

declare module "fastify" {
  interface FastifyInstance {
    imageKitUtil: ImageKitUtil;
  }
}
