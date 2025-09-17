import { PrismaClient, Language } from "@repo/db";
import { ProblemRepository } from "./problem.repository.js";
import { RunnerService } from "../executor/executor.service.js";

export class ProblemService {
  private prisma: PrismaClient;
  private problemRepository: ProblemRepository;
  private runnerService: RunnerService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.problemRepository = new ProblemRepository(prisma);
    this.runnerService = new RunnerService(prisma);
  }

  async runSubmitProblem(
    userId: string,
    code: string,
    problemId: number,
    language: Language,
  ) {
    const results = await this.runnerService.testCode(
      code,
      problemId,
      language,
      true,
    );
    if (!results.success || results.error) return results;

    const outputs = results.data;
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;

    outputs?.forEach((output) => {
      if (output.status == "PASS") testCasesPassed++;
      runtime += output.runtime;
      memory += output.memory;
    });

    const newSubmission = await this.problemRepository.createProblemSubmission({
      code,
      language,
      problemId,
      userId,
      memory,
      runtime,
      testCasesPassed,
      isAccepted: testCasesPassed === outputs?.length,
    });

    return { success: true, data: { submission: newSubmission, outputs } };
  }
}
