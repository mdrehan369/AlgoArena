import { Level, PrismaClient, Topic, Prisma, SubmittedResult } from "@repo/db";
import { ProblemRepository } from "./problem.repository.js";

export class ProblemService {
    private prisma: PrismaClient
    private problemRepository: ProblemRepository

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
        this.problemRepository = new ProblemRepository(prisma)
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
        if(!id || id == "") throw new Error("User ID is required to fetch problems with user status");
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
}
