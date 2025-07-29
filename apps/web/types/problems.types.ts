import { Prisma } from "@repo/db"

export type ProblemWithUserStatus = Prisma.ProblemGetPayload<{ include: { submittedResults: true } }> & { userStatus: string }
