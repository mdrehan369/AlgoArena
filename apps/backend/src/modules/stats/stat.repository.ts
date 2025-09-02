import { PrismaClient } from "@repo/db";

export class StatRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async getProblemsSolved(userId: string) {
    const problemsSolved = await this.prisma.submittedResult.groupBy({
      by: ["problemId"],
      where: {
        userId
      },
      having: {
        isAccepted: {
          _count: {
            gt: 0
          }
        }
      }
    })

    return problemsSolved.length
  }

  async getTotalAttempts(userId: string) {
    const totalAttempts = await this.prisma.submittedResult.count({
      where: {
        userId
      }
    })

    return totalAttempts
  }


  // For now rank is based on number of problems solved but later on i will update to points system
  async getGlobalRank(userId: string) {
    const result = await this.prisma.$queryRawUnsafe<
      { user_id: string; rank: number }[]
    >(`
            WITH accepted_counts AS (
            SELECT
                "userId" AS user_id,
                COUNT(*) AS accepted_count
            FROM "SubmittedResult"
            WHERE "isAccepted" = true
            GROUP BY "userId"
            ),
            ranked_users AS (
            SELECT
                user_id,
                RANK() OVER (ORDER BY accepted_count DESC) AS rank
            FROM accepted_counts
            )
            SELECT user_id, rank
            FROM ranked_users
            WHERE user_id = $1;
        `, userId)

    return result[0] ?? { rank: 1, user_id: userId }
  }

  async getLeaderboard(limit: number = 10) {
    return await this.prisma.$queryRawUnsafe<
      { user_id: string; accepted_count: number; rank: number }[]
    >(`
            WITH accepted_counts AS (
            SELECT
                "userId" AS user_id,
                COUNT(*) AS accepted_count
            FROM "SubmittedResult"
            WHERE "isAccepted" = true
            GROUP BY "userId"
            ),
            ranked_users AS (
            SELECT
                user_id,
                accepted_count,
                RANK() OVER (ORDER BY accepted_count DESC) AS rank
            FROM accepted_counts
            )
            SELECT * FROM ranked_users
            ORDER BY rank
            LIMIT $1;
        `, limit)
  }
}
