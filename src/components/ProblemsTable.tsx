"use client"

import { Level, Problem } from "@prisma/client";
import { Table } from "@mantine/core"

const ProblemsTable = ({ problemStatements }: {problemStatements: Problem[]}) => {
    const { Td, Tr, Tbody } = Table
    return (
        <Table className='w-full' verticalSpacing={"sm"} borderColor='gray'>
        <Tbody>
            {problemStatements?.map((prob, index) => (
                <Tr
                    key={index}
                    className='hover:bg-slate-900 border-b-0 cursor-pointer transition-colors duration-300'
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
                </Tr>
            ))}
        </Tbody>
    </Table>
    )
}

export default ProblemsTable