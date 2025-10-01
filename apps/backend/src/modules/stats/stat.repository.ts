import { Language, Level, PrismaClient, Topic, User } from "@repo/db";

export class StatRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getProblemsSolved(userId: string) {
    const problemsSolved = await this.prisma.submittedResult.groupBy({
      by: ["problemId"],
      where: {
        userId,
      },
      having: {
        isAccepted: {
          _count: {
            gt: 0,
          },
        },
      },
    });

    return problemsSolved.length;
  }

  async getTotalAttempts(userId: string) {
    const totalAttempts = await this.prisma.submittedResult.count({
      where: {
        userId,
      },
    });

    return totalAttempts;
  }

  // For now rank is based on number of problems solved but later on i will update to points system
  async getGlobalRank(userId: string) {
    const result = await this.prisma.$queryRawUnsafe<
      { user_id: string; rank: number }[]
    >(
      `
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
        `,
      userId,
    );

    return result[0] ?? { rank: 1, user_id: userId };
  }

  async getLeaderboard(limit: number = 10) {
    return await this.prisma.$queryRawUnsafe<
      { user_id: string; accepted_count: number; rank: number }[]
    >(
      `
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
        `,
      limit,
    );
  }

  async getCurrentStreak(userId: User["id"]) {
    const submissions = await this.prisma.submittedResult.findMany({
      where: { userId },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    let currentDate = new Date();
    let streak = 0;

    const days = Array.from(
      new Set(submissions.map((s) => s.createdAt.toISOString().slice(0, 10))),
    );

    for (const day of days) {
      const target = currentDate.toISOString().slice(0, 10);
      if (day === target) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  async getAcceptanceRate(userId: User["id"]) {
    const [problemsAccepted, totalProblemsAttempted] = await Promise.all([
      this.prisma.submittedResult.groupBy({
        by: ["problemId"],
        where: { userId, isAccepted: true },
      }),
      this.prisma.submittedResult.groupBy({
        by: ["problemId"],
        where: { userId },
      }),
    ]);

    if (totalProblemsAttempted.length == 0) return 0;

    return (problemsAccepted.length / totalProblemsAttempted.length) * 100;
  }

  async getProblemsSolvedByDifficulty(
    userId: User["id"],
  ): Promise<Record<Level, number>> {
    const generateQuery = async (level: Level) => {
      return (
        await this.prisma.submittedResult.groupBy({
          by: ["problemId"],
          where: { userId, isAccepted: true, problem: { level } },
        })
      ).length;
    };

    const solved = await Promise.all([
      generateQuery("STARTER"),
      generateQuery("APPRENTICE"),
      generateQuery("CHALLENGER"),
      generateQuery("EXPERT"),
      generateQuery("LEGENDARY"),
    ]);

    return {
      STARTER: solved[0],
      APPRENTICE: solved[1],
      CHALLENGER: solved[2],
      EXPERT: solved[3],
      LEGENDARY: solved[4],
    };
  }

  async getProblemsSolvedByLanguages(
    userId: User["id"],
  ): Promise<Record<Language, number>> {
    const generateQuery = async (language: Language) => {
      return (
        await this.prisma.submittedResult.groupBy({
          by: ["problemId"],
          where: { userId, isAccepted: true, language },
        })
      ).length;
    };

    const solved = await Promise.all([
      generateQuery("CPP"),
      generateQuery("C"),
      generateQuery("JS"),
      generateQuery("PYTHON"),
    ]);

    return {
      CPP: solved[0],
      C: solved[1],
      JS: solved[2],
      PYTHON: solved[3],
    };
  }

  async getProblemsSolvedByTopics(userId: User["id"]) {
    const problemsSolved = await this.prisma.submittedResult.findMany({
      where: { userId, isAccepted: true },
      select: {
        problem: {
          select: {
            topics: true,
          },
        },
      },
    });

    const topicSet = new Set<Topic>();
    for (const problem of problemsSolved) {
      problem.problem.topics.forEach((val) => topicSet.add(val));
    }

    const subByTopics: Partial<Record<Topic, number>> = {};

    for (let topic of Array.from(topicSet)) {
      const solved = await this.prisma.submittedResult.groupBy({
        by: ["problemId"],
        where: {
          userId,
          isAccepted: true,
          problem: {
            topics: {
              has: topic,
            },
          },
        },
      });

      subByTopics[topic] = solved.length;
    }

    return subByTopics;
  }

  async getRecentActivity(userId: User["id"], numOfDays: number = 10) {
    const currentDate = new Date();
    const submissions = await this.prisma.submittedResult.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(
            currentDate.setDate(currentDate.getDate() - numOfDays),
          ).toISOString(),
        },
      },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    const dateToSolve: Record<string, number> = {};

    submissions.map((sub) => {
      const date = sub.createdAt.toISOString().slice(0, 10);
      if (Object.hasOwn(dateToSolve, date)) dateToSolve[date]++;
      else dateToSolve[date] = 1;
    });

    return dateToSolve;
  }
}
