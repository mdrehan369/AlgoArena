"use client"

import { Container } from "@/components"
import { Problem, Topic } from "@prisma/client"
import { Checkbox, Loader, Pagination } from "@mantine/core"
import ProblemsTable from "@/components/ProblemsTable"
import { useEffect, useState } from "react"
import { getAllProblems } from "@/actions/problem.actions"
import { useAppDispatch } from "@/libs/hooks"
import { setNotification, Variant } from "@/libs/features/Errors/notificationSlice"

export default function ProblemsPage() {
    const [problemStatements, setProblemStatements] = useState<Problem[]>([])
    const [loading, setLoading] = useState(true)
    const [topics, setTopics] = useState<Topic[]>([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const dispatch = useAppDispatch()

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const statements = await getAllProblems({ topics, page, limit })
            if (!statements)
                dispatch(
                    setNotification({
                        message: (
                            <>
                                <p>Sorry some error occured</p>
                                <p>while fetching problem statements</p>
                            </>
                        ),
                        title: "Server Error",
                        variant: Variant.ERROR
                    })
                )
            else setProblemStatements(statements)
            setLoading(false)
        })()
    }, [topics, page, limit])

    return (
        <Container className='px-[6vw] py-10 flex items-start justify-center gap-10 relative'>
            <div className='w-[25vw] bg-slate-900 flex gap-4 flex-col items-center justify-start overflow-y-scroll h-[75vh] py-8 px-4 border-primary border-0'>
                <h1 className='text-xl font-bold uppercase'>Topics</h1>
                <div className=''>
                    {Object.keys(Topic).map((topic, index) => (
                        <div className='flex items-center mb-4' key={index}>
                            <Checkbox
                                label={topic.replace("_", " ")}
                                color='violet'
                                variant='outline'
                                className='bg-transparent cursor-pointer'
                                onClick={() => {
                                    if (topics.includes(topic as Topic))
                                        setTopics((prev) =>
                                            prev.filter((val) => val != topic)
                                        )
                                    else
                                        setTopics((prev) => [
                                            ...prev,
                                            topic as Topic
                                        ])
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-[75vw] h-[75vh] relative'>
                {!loading ? (
                    <ProblemsTable problemStatements={problemStatements} />
                ) : (
                    <div className='w-[60vw] h-[70vh] flex items-center justify-center'>
                        <Loader color='blue' />
                    </div>
                )}
                <Pagination
                    className='absolute bg-slate-800 bottom-0 left-[50%] translate-x-[-50%]'
                    total={problemStatements.length == limit ? page + 1 : page}
                    value={page}
                    styles={{
                        root: {
                            backgroundColor: "#0f172a",
                            padding: "10px",
                            borderRadius: "10px"
                        },
                        control: {
                            backgroundColor: "#060b1c",
                            color: "white",
                            borderColor: "transparent"
                        }
                    }}
                    onChange={setPage}
                    siblings={1}
                />
            </div>
        </Container>
    )
}
