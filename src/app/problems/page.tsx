"use client"

import { Container } from "@/components"
import { Problem, Topic } from "@prisma/client"
import { Checkbox } from "@mantine/core"
import ProblemsTable from "@/components/ProblemsTable"
import { useEffect, useState } from "react"
import { getAllProblems } from "@/actions/problem.actions"

export default async function ProblemsPage() {
    // const problemStatements = await prismaClient.problem.findMany({})
    const [problemStatements, setProblemStatements] = useState<Problem[]>([])
    const [topics, setTopics] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        ;(async () => {
            const statements = await getAllProblems({topics, page, limit})
            setProblemStatements(statements)
        })()
    }, [])

    return (
        <Container className='px-[10vw] py-10 flex items-start justify-center gap-10'>
            <div className='w-[25vw] bg-slate-900 flex gap-4 flex-col items-center justify-start overflow-y-scroll h-[85vh] p-2 border-primary border-0'>
                <h1 className='text-xl font-bold uppercase'>Topics</h1>
                <div className=''>
                    {Object.keys(Topic).map((topic, index) => (
                        <div className='flex items-center mb-4' key={index}>
                            <Checkbox
                                label={topic.replace("_", " ")}
                                color='violet'
                                variant='outline'
                                className='bg-transparent'
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ProblemsTable problemStatements={problemStatements} />
        </Container>
    )
}
