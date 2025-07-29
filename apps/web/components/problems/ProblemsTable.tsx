"use client"

import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Anchor, Badge, Card, Group, Progress, Table, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconMinus, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { secondaryColors } from "@utils/colors";
import { levelColors, levelLabels, ProblemsQueryKeys } from "@utils/constants";
import { getProblems } from "queries/problems.queries";
import { ProblemWithUserStatus } from "types/problems.types";
import Link from "next/link";
import { useEffect } from "react";
import { setProblems } from "@lib/features/problems/problems.slice";
import CustomLoader from "@components/Loader";

export default function ProblemsTable() {

    const { searchQuery, selectedLevel, selectedStatus, selectedTopics } = useAppSelector(state => state.problem.filters)
    const { page, limit, problems } = useAppSelector(state => state.problem)
    const dispatch = useAppDispatch()

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "solved":
                return <IconCheck size={16} color="#10b981" />
            case "attempted":
                return <IconMinus size={16} color="#f59e0b" />
            default:
                return <IconX size={16} color="#6b7280" />
        }
    }

    const queryParams = {
            page,
            limit,
            level: selectedLevel || undefined,
            search: searchQuery,
            status: selectedStatus || undefined,
            topics: selectedTopics
        }

    const { data, isFetching } = useQuery<ProblemWithUserStatus[]>({
        queryKey: [...ProblemsQueryKeys, queryParams],
        queryFn: () => getProblems(queryParams),
        initialData: []
    })


    useEffect(() => {
        dispatch(setProblems(data))
    }, [isFetching, data, dispatch])

    return (
        <Card
            padding={0}
            style={{
                backgroundColor: secondaryColors.DARK,
                border: "1px solid #475569",
                overflow: "hidden",
            }}
        >
            {!isFetching ?
                <Table
                    highlightOnHover
                    styles={{
                        table: { backgroundColor: "transparent" },
                        th: {
                            backgroundColor: secondaryColors.DARK,
                            color: "white",
                            borderBottom: "1px solid #475569",
                            padding: "16px",
                        },
                        td: {
                            borderBottom: "1px solid #374151",
                            padding: "16px",
                        },
                        tr: {
                            transition: "background-color 0.2s ease",
                            "&:hover": {
                                backgroundColor: "#000000", // hover bg color
                            },
                        },
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Difficulty</Table.Th>
                            <Table.Th>Topics</Table.Th>
                            <Table.Th>Acceptance</Table.Th>
                            <Table.Th>Submissions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {problems.map((problem) => (
                            <tr key={problem.id} className="hover:bg-secondary-default transition-colors">
                                <Table.Td>
                                    <Tooltip label={problem.userStatus.replace("-", " ")}>{getStatusIcon(problem.userStatus)}</Tooltip>
                                </Table.Td>
                                <Table.Td>
                                    <Anchor
                                        component={Link}
                                        href={`/problems/${problem.slug}`}
                                        c="white"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Text fw={500} style={{ "&:hover": { color: "#14b8a6" } }}>
                                            {problem.title}
                                        </Text>
                                    </Anchor>
                                </Table.Td>
                                <Table.Td>
                                    <Badge color={levelColors[problem.level]} variant="light" size="sm">
                                        {levelLabels[problem.level]}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        {problem.topics.slice(0, 2).map((topic) => (
                                            <Badge key={topic} color="gray" variant="outline" size="xs">
                                                {topic.replace(/_/g, " ")}
                                            </Badge>
                                        ))}
                                        {problem.topics.length > 2 && (
                                            <Text c="gray.4" size="xs">
                                                +{problem.topics.length - 2}
                                            </Text>
                                        )}
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Progress
                                            value={problem.acceptanceRate}
                                            size="sm"
                                            w={60}
                                            color={problem.acceptanceRate > 70 ? "green" : problem.acceptanceRate > 50 ? "yellow" : "red"}
                                        />
                                        <Text c="gray.3" size="sm">
                                            {problem.acceptanceRate.toFixed(1)}%
                                        </Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Text c="gray.3" size="sm">
                                        {problem.submittedResults.length.toLocaleString()}
                                    </Text>
                                </Table.Td>
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
                : <CustomLoader />
            }
        </Card>
    )
}
