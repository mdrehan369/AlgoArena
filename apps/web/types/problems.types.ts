import { Prisma } from "@repo/db"

export type ProblemWithUserStatus = Prisma.ProblemGetPayload<{ include: { submittedResults: true } }> & { userStatus: string }

export type FullProblem = Prisma.ProblemGetPayload<{
  include: {
    driverCodes: true,
    exampleTestCases: true,
    submittedResults: true,
    testCases: true
  }
}>
