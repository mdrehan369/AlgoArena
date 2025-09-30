import { PrismaClient, User } from "@repo/db";
import { ProfileKeys, ProfileRepository } from "./profile.repository";

export class ProfileService {
  private prisma: PrismaClient;
  private profileRepository: ProfileRepository;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.profileRepository = new ProfileRepository(prisma);
  }

  async updateProfile(
    userId: User["id"],
    body: {
      bio?: string;
      location?: string;
      website?: string;
      github?: string;
      linkedin?: string;
      x?: string;
    },
  ) {
    for (const key of Object.keys(body) as ProfileKeys[]) {
      if (!body[key]) continue;
      const response = await this.profileRepository.updateProfile(
        userId,
        key as ProfileKeys,
        body[key],
      );
      if (!response)
        return { success: false, message: `Error while updating ${key}` };
    }

    return { success: true, message: "Updated successfully!" };
  }

  async updateProfilePicture(userId: User["id"], url: string, fileId: string) {
    return this.profileRepository.updateProfilePicture(userId, url, fileId);
  }

  async deleteProfilePicture(userId: User["id"]) {
    return this.profileRepository.deleteProfilePicture(userId);
  }
}
