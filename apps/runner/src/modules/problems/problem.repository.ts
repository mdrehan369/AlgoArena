import { Language, PrismaClient, Problem, User } from "@repo/db";

export class ProblemRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getProblemById(
    id: Problem["id"],
    withHiddenTestcases: boolean = false,
  ) {
    let testCases: Record<string, any> | boolean = {
      where: {
        hidden: false,
      },
    };
    if (withHiddenTestcases) testCases = true;

    const problem = await this.prisma.problem.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        driverCodes: true,
        exampleTestCases: true,
        submittedResults: true,
        customTestCases: true,
        testCases,
      },
    });

    if (!problem) return { success: false, err: "No problem found!" };

    return { success: true, data: problem };
  }

  async createProblemSubmission({
    code,
    isAccepted,
    language,
    problemId,
    testCasesPassed,
    userId,
    runtime,
    memory,
  }: {
    code: string;
    language: Language;
    problemId: Problem["id"];
    userId: User["id"];
    testCasesPassed: number;
    isAccepted: boolean;
    runtime: number;
    memory: number;
  }) {
    return await this.prisma.submittedResult.create({
      data: {
        code,
        language,
        runtime,
        isAccepted,
        problemId: Number(problemId),
        userId,
        testCasesPassed,
        memory,
      },
    });
  }
}
