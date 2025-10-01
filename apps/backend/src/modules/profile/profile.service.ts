import { PrismaClient, User } from "@repo/db";
import { ProfileKeys, ProfileRepository } from "./profile.repository";
import { StatRepository } from "../stats/stat.repository";

export class ProfileService {
  private prisma: PrismaClient;
  private profileRepository: ProfileRepository;
  private statsRepository: StatRepository;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.profileRepository = new ProfileRepository(prisma);
    this.statsRepository = new StatRepository(prisma);
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

  async getQuickStats(userId: User["id"]) {
    const problemsSolved = await this.statsRepository.getProblemsSolved(userId);
    const getCurrStreak = await this.statsRepository.getCurrentStreak(userId);

    return { problemsSolved, getCurrStreak };
  }

  async getStatsOverview(userId: User["id"]) {
    const problemsSolved = await this.statsRepository.getProblemsSolved(userId);
    const acceptanceRate = await this.statsRepository.getAcceptanceRate(userId);
    const totalSubmissions =
      await this.statsRepository.getTotalAttempts(userId);
    const problemsSolvedByDifficulty =
      await this.statsRepository.getProblemsSolvedByDifficulty(userId);
    const problemsSolvedByLanguages =
      await this.statsRepository.getProblemsSolvedByLanguages(userId);
    const problemsSolvedByTopics =
      await this.statsRepository.getProblemsSolvedByTopics(userId);
    const recentActivity = await this.statsRepository.getRecentActivity(userId);

    return {
      problemsSolved,
      acceptanceRate,
      totalSubmissions,
      problemsSolvedByDifficulty,
      problemsSolvedByLanguages,
      problemsSolvedByTopics,
      recentActivity,
    };
  }
}
