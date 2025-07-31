export { prisma } from './client.js' // exports instance of prisma 
export type {
    Account,
    DriverCode,
    ExampleTestCases,
    Language,
    Prisma,
    Level,
    Topic,
    PrismaClient,
    Problem,
    Session,
    SubmittedResult,
    TestCase,
    User,
    Verification,
} from "../generated/prisma/index.js" // exports generated types from prisma

export * from "../generated/prisma/index.js"
