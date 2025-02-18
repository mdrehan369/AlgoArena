"use client"

import { Level, Problem } from "@prisma/client"
import { Table } from "@mantine/core"
import { useRouter } from "next/navigation"

const ProblemsTable = ({
    problemStatements
}: {
    problemStatements: Problem[]
}) => {
    const { Td, Tr, Tbody } = Table
    const router = useRouter()
    return problemStatements.length > 0 ? (
        <Table className='max-w-[75vw]' verticalSpacing={"sm"} borderColor='gray'>
            <Tbody>
                {problemStatements?.map((prob, index) => (
                    <Tr
                        key={index}
                        className='hover:bg-slate-900 border-b-0 cursor-pointer transition-colors duration-300'
                        onClick={() => router.push(`/problems/${prob.id}`)}
                    >
                        <Td>{prob.id}</Td>
                        <Td>{prob.title}</Td>
                        <Td className='w-fit'>
                            <span
                                className={
                                    prob.level === Level.EASY
                                        ? "bg-green-400 text-green-800 rounded w-fit px-4 py-1"
                                        : prob.level === Level.MEDIUM
                                        ? "bg-yellow-400 text-yellow-800 rounded w-fit px-4 py-1"
                                        : "bg-red-400 text-red-800 rounded w-fit px-4 py-1"
                                }
                            >
                                {prob.level}
                            </span>
                        </Td>
                        <Td className='space-x-2'>
                            {prob.topics.map((topic) => (
                                <span
                                    key={topic}
                                    className='bg-slate-900 text-xs p-2 rounded-full'
                                >
                                    {topic.replaceAll("_", " ")}
                                </span>
                            ))}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    ) : (
        <div className='w-[60vw] h-full flex items-center justify-center text-xl font-semibold'>
            No Problem Statements to solve for now!
        </div>
    )
}

export default ProblemsTable
