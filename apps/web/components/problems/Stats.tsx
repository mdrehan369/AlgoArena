export const dynamic = 'force-dynamic'

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
import api from "config/axios.config"

export default async function Stats() {
    // Fallback values
    let problemsSolved = 42, totalAttempts = 50, globalRank = 100

    try {
        const { data } = await api.get("/stats")
        problemsSolved = data.data.problemsSolved
        totalAttempts = data.data.totalAttempts
        globalRank = data.data.globalRank
    } catch (error) {
        console.log("Error while fetching stats", error)
    }

    return (
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
