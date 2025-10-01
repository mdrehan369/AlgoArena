import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ProfileService } from "./profile.service";
import { ProfileUpdateSchema } from "@/schemas/profile/profile.put";
import path from "path";
import { pipeline } from "stream";
import { createWriteStream, existsSync, unlinkSync } from "fs";
import { promisify } from "util";
import {
  GetOverviewStatsSchema,
  GetQuickStatsSchema,
} from "@/schemas/profile/profile.get";

const pump = promisify(pipeline);

export const profileController: FastifyPluginCallback = (
  instance,
  opts,
  done,
) => {
  const fastify = instance as FastifyInstance & {
    profileService: ProfileService;
  };

  fastify.decorate("profileService", new ProfileService(fastify.prisma));

  fastify.addHook(
    "onRequest",
    async (req: FastifyRequest, reply: FastifyReply) => {
      if (!fastify.user) {
        fastify.log.warn("Unauthorized access attempt to problems endpoint");
        return reply
          .status(401)
          .send({ error: "Unauthorized", success: false });
      }
    },
  );

  fastify.put(
    "/",
    { schema: ProfileUpdateSchema },
    async (
      req: FastifyRequest<{
        Body: {
          bio?: string;
          location?: string;
          website?: string;
          github?: string;
          linkedin?: string;
          x?: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      const response = await fastify.profileService.updateProfile(
        fastify.user!.id,
        req.body,
      );
      return reply.send(response);
    },
  );

  fastify.put("/picture", async (req: FastifyRequest, reply: FastifyReply) => {
    const file = await req.file();
    if (!file)
      return reply
        .status(400)
        .send({ success: false, message: "File not found" });

    const uploadDir = path.join(process.cwd(), "tmp");
    const timeStamp = Date.now();
    const fileName = `${timeStamp}-${file.filename}`;
    const filePath = path.join(uploadDir, fileName);

    if (fastify.user!.fileId) {
      const deleteResponse = await fastify.imageKitUtil.deleteImage(
        fastify.user!.fileId,
      );
      console.log(deleteResponse);
      await fastify.profileService.deleteProfilePicture(fastify.user!.id);
    }

    await pump(file.file, createWriteStream(filePath));

    const response = await fastify.imageKitUtil.uploadImage(filePath, fileName);
    if (!response)
      return reply.status(500).send({
        success: false,
        message: "Some error occured while uploading image",
      });

    if (existsSync(filePath)) unlinkSync(filePath);

    const isUpdated = await fastify.profileService.updateProfilePicture(
      fastify.user!.id,
      response.url,
      response.fileId,
    );
    if (!isUpdated)
      return reply.status(500).send({
        success: false,
        message: "Some error occured while updating image",
      });

    return reply.send({ success: true, message: "Uploaded" });
  });

  fastify.get(
    "/quick",
    { schema: GetQuickStatsSchema },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const quick = await fastify.profileService.getQuickStats(
        fastify.user!.id,
      );
      return reply
        .status(200)
        .send({ success: true, data: quick, message: "Fetched!" });
    },
  );

  fastify.get(
    "/overview",
    { schema: GetOverviewStatsSchema },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const overview = await fastify.profileService.getStatsOverview(
        fastify.user!.id,
      );
      return reply
        .status(200)
        .send({ success: true, data: overview, message: "Fetched!" });
    },
  );

  done();
};
