import { PrismaClient } from "@repo/db";
import { StatRepository } from "./stat.repository.js";

export class StatService {
    private statRepository: StatRepository

    constructor(prisma: PrismaClient) {
        this.statRepository = new StatRepository(prisma)
    }

    async getBasicStats(userId: string) {
        const problemsSolved = await this.statRepository.getProblemsSolved(userId)
        const totalAttempts = await this.statRepository.getTotalAttempts(userId)
        const globalRank = await this.statRepository.getGlobalRank(userId)

        return {
            problemsSolved,
            totalAttempts,
            globalRank: globalRank.rank
        }
    }
}
