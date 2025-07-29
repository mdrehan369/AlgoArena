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

export default function Stats() {
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
                            42
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
                            156
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
                            #1,247
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
