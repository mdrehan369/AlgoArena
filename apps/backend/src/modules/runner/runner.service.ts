import { Language, PrismaClient, Problem } from "@repo/db";
import { RunnerRepository } from "./runner.repository.js";
import { ProblemRepository } from "../problems/problem.repository.js";
import cExecutor from "src/utils/executors/cExecutor.js";
import cppExecutor from "src/utils/executors/cppExecutor.js";
import pythonExecutor from "src/utils/executors/pythonExecutor.js";
import jsExecutor from "src/utils/executors/jsExecutor.js";
import { Outputs } from "src/types/runner.types.js";

export class RunnerService {
  private runnerRepository: RunnerRepository
  private problemRepository: ProblemRepository

  constructor(prisma: PrismaClient) {
    this.runnerRepository = new RunnerRepository(prisma)
    this.problemRepository = new ProblemRepository(prisma)
  }

  async testCode(code: string, problemId: Problem['id'], language: Language): Promise<{ success: boolean, message?: string, data?: Outputs[], error?: string, errorCode?: number }> {
    if (code == "") return { success: false, message: "No code given", errorCode: 400 }

    const result = await this.problemRepository.getProblemById(problemId)
    if (!result.success) return { success: false, message: "No problem found", errorCode: 404 }

    const problem = result.data!
    const driverCode = problem.driverCodes.find(code => code.language == language) || problem.driverCodes[0]

    // const fullCode = Buffer.from(driverCode.beforeCode, "base64").toString("utf-8") + code + Buffer.from(driverCode.afterCode, "base64").toString("utf-8")
    const fullCode = driverCode.beforeCode.replaceAll("\\n", "\n") + code + driverCode.afterCode.replaceAll("\\n", "\n")
    let executor = null
    switch (language) {
      case Language.C:
        executor = cExecutor
        break
      case Language.CPP:
        executor = cppExecutor
        break
      case Language.PYTHON:
        executor = pythonExecutor
        break
      case Language.JS:
        executor = jsExecutor
        break
      default:
        executor = cppExecutor
    }

    const results = await executor(fullCode, problem.testCases, problem.timeLimit, problem.memoryLimit)
    return results
  }

}
