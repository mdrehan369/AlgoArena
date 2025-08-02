"use client"

import {
    Text,
    Card,
    Group,
    Stack,
    ThemeIcon,
} from "@mantine/core"
import {
    IconTrophy,
    IconClock,
    IconUsers,
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { StatsQueryKeys } from "@utils/constants"
import { getBasicStats } from "queries/stats.queries"

export default function Stats() {

    const { data, isFetching } = useQuery({
        initialData: { data: { problemsSolved: 42, totalAttempts: 50, globalRank: 100 } },
        queryKey: [...StatsQueryKeys],
        queryFn: async () => getBasicStats()
    })

    const { problemsSolved, totalAttempts, globalRank } = data.data

    return (
        !isFetching &&
        <Group mb="xl" grow>
            <Card
                padding="lg"
                style={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid #475569",
                }}
            >
                <Group>
                    <ThemeIcon size={48} variant="light" color="teal">
                        <IconTrophy size={24} />
                    </ThemeIcon>
                    <Stack gap={0}>
                        <Text c="white" fw={600} size="lg">
                            {problemsSolved}
                        </Text>
                        <Text c="gray.4" size="sm">
                            Problems Solved
                        </Text>
                    </Stack>
                </Group>
            </Card>

            <Card
                padding="lg"
                style={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid #475569",
                }}
            >
                <Group>
                    <ThemeIcon size={48} variant="light" color="blue">
                        <IconClock size={24} />
                    </ThemeIcon>
                    <Stack gap={0}>
                        <Text c="white" fw={600} size="lg">
                            {totalAttempts}
                        </Text>
                        <Text c="gray.4" size="sm">
                            Total Attempts
                        </Text>
                    </Stack>
                </Group>
            </Card>

            <Card
                padding="lg"
                style={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid #475569",
                }}
            >
                <Group>
                    <ThemeIcon size={48} variant="light" color="yellow">
                        <IconUsers size={24} />
                    </ThemeIcon>
                    <Stack gap={0}>
                        <Text c="white" fw={600} size="lg">
                            #{globalRank}
                        </Text>
                        <Text c="gray.4" size="sm">
                            Global Rank
                        </Text>
                    </Stack>
                </Group>
            </Card>
        </Group>


    )
}
