import { PrismaClient } from '../generated/prisma/'
import { data } from "../data/problemsData"
const prisma = new PrismaClient()
async function main() {

    data.map(async ({ title, acceptanceRate, constraints, description, driverCodes, exampleTestCases, level, slug, testCases, topics }) => {
        const prblm = await prisma.problem.create({
            include: {
                driverCodes: true,
                exampleTestCases: true,
                testCases: true
            },
            data: {
                description,
                title,
                driverCodes: {
                    createMany: {
                        data: driverCodes
                    }
                },
                slug,
                acceptanceRate,
                constraints,
                level,
                topics,
                exampleTestCases: {
                    createMany: {
                        data: exampleTestCases
                    }
                },
                testCases: {
                    createMany: {
                        data: testCases
                    }
                }
            }
        })
        console.log(prblm.id)
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
