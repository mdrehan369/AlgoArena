import { Language, Level, Prisma, PrismaClient, Problem, Topic, User } from "@repo/db"


export class ProblemRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async getAllProblems(
    userId: string,
    page: number = 1,
    limit: number = 15,
    status?: "solved" | "attempted" | "not-attempted",
    topics: Topic[] = [],
    search: string = "",
    level?: Level
  ) {

    const whereQuery: Prisma.ProblemWhereInput = {
      AND: [
        {
          topics: { hasEvery: topics },
        },
        {
          title: { contains: search, mode: "insensitive" }
        },
        {
          level: { equals: level }
        },
      ]
    }

    if (!Array.isArray(whereQuery.AND)) {
      whereQuery.AND = whereQuery.AND ? [whereQuery.AND] : [];
    }

    if (status == "solved")
      whereQuery["AND"] = [...whereQuery["AND"], { submittedResults: { some: { userId: userId, isAccepted: true } } }]


    if (status == "attempted")
      whereQuery["AND"] = [...whereQuery["AND"], { submittedResults: { some: { userId: userId, isAccepted: false } } }]

    if (status == "not-attempted")
      whereQuery["AND"] = [...whereQuery["AND"], { submittedResults: { none: { userId: userId } } }]


    return this.prisma.problem.findMany({
      include: {
        submittedResults: true
      },
      where: whereQuery,
      skip: (page - 1) * limit,
      take: limit
    })
  }

  async getProblemBySlug(slug: string) {

    const problem = await this.prisma.problem.findFirst({
      where: {
        slug
      },
      include: {
        driverCodes: true,
        exampleTestCases: true,
        submittedResults: true,
        testCases: {
          where: {
            hidden: false
          }
        }
      }
    })

    if (!problem)
      return { success: false, err: "No problem found!" }

    return { success: true, data: problem }
  }

  async getProblemById(id: Problem['id'], withHiddenTestcases: boolean = false) {

    let testCases: Record<string, any> | boolean = {
      where: {
        hidden: false
      }
    }
    if (withHiddenTestcases) testCases = true

    const problem = await this.prisma.problem.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        driverCodes: true,
        exampleTestCases: true,
        submittedResults: true,
        testCases
      }
    })

    if (!problem)
      return { success: false, err: "No problem found!" }

    return { success: true, data: problem }
  }

  async createProblemSubmission(
    { code, isAccepted, language, problemId, testCasesPassed, userId, runtime, memory }:
      { code: string, language: Language, problemId: Problem['id'], userId: User['id'], testCasesPassed: number, isAccepted: boolean, runtime: number, memory: number }) {
    return await this.prisma.submittedResult.create({
      data: {
        code,
        language,
        runtime,
        isAccepted,
        problemId: Number(problemId),
        userId,
        testCasesPassed,
        memory
      }
    })
  }

}
