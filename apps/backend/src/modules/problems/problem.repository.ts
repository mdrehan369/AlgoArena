import { Level, Prisma, PrismaClient, Topic } from "@repo/db"


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
}
