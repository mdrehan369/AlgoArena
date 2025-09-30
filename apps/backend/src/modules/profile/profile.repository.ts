import { PrismaClient, User } from "@repo/db";

export type ProfileKeys =
  | "bio"
  | "location"
  | "website"
  | "github"
  | "linkedin"
  | "x";

export class ProfileRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async updateProfile(userId: User["id"], key: ProfileKeys, value: string) {
    const response = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        [key]: value,
      },
    });

    if (response) return true;
    return false;
  }

  async updateProfilePicture(userId: User["id"], url: string, fileId: string) {
    const response = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: url,
        fileId,
      },
    });

    if (response) return true;
    return false;
  }

  async deleteProfilePicture(userId: User["id"]) {
    const response = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: null,
        fileId: null,
      },
    });

    if (response) return true;
    return false;
  }
}
