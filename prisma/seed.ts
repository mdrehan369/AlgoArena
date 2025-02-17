import { PrismaClient } from "@prisma/client"
import { problemStatements } from "../src/data"
const prisma = new PrismaClient()

async function main() {
    problemStatements.map(async (prob) => {
        await prisma.problem.create({
            data: {
                title: prob.title,
                description: prob.description,
                driverCode: prob.driverCode,
                topics: prob.topics,
                level: prob.level,
                exampleTestCases: {
                    createMany: {
                        data: prob.exampleTestCases
                    }
                }
            }
        })
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
