import { Level, PrismaClient, Topic, Prisma, SubmittedResult, Language } from "@repo/db";
import { ProblemRepository } from "./problem.repository.js";
import { RunnerService } from "../runner/runner.service.js";
import { argv0 } from "process";

export class ProblemService {
  private prisma: PrismaClient
  private problemRepository: ProblemRepository
  private runnerService: RunnerService

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
    this.problemRepository = new ProblemRepository(prisma)
    this.runnerService = new RunnerService(prisma)
  }

  async getAllProblems(
    id: string,
    page: number = 1,
    limit: number = 15,
    status?: "solved" | "attempted" | "not-attempted",
    topics: Topic[] = [],
    search: string = "",
    level?: Level
  ) {
    // Returns all problems with user status
    if (!id || id == "") throw new Error("User ID is required to fetch problems with user status");
    const problems = await this.problemRepository.getAllProblems(id, page, limit, status, topics, search, level);

    return problems.map((problem: Prisma.ProblemGetPayload<{ include: { submittedResults: true } }>) => {
      let userStatus = "";

      const prblm = problem.submittedResults.filter((res: SubmittedResult) => res.userId === id);
      if (prblm.length == 0) userStatus = "not-attempted";
      else if (prblm.find((res: SubmittedResult) => res.isAccepted == true)) userStatus = "solved";
      else userStatus = "attempted";

      return {
        ...problem,
        userStatus
      };
    });
  }

  async getProblemBySlug(slug: string) {
    return this.problemRepository.getProblemBySlug(slug)
  }

  async runSubmitProblem(userId: string, code: string, problemId: number, language: Language) {

    const results = await this.runnerService.testCode(code, problemId, language, true)
    if (!results.success || results.error) return results

    const outputs = results.data
    let testCasesPassed = 0
    let runtime = 0
    let memory = 0

    outputs?.forEach(output => {
      if (output.status == "PASS") testCasesPassed++
      runtime += output.runtime
      memory += output.memory
    })

    const newSubmission = await this.problemRepository.createProblemSubmission({
      code,
      language,
      problemId,
      userId,
      memory,
      runtime,
      testCasesPassed,
      isAccepted: testCasesPassed === outputs?.length
    })

    return { success: true, data: { submission: newSubmission, outputs } }

  }
}
