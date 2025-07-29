import { Anchor, Box, Container, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconArrowLeft, IconCode } from "@tabler/icons-react";
import Link from "next/link";

export default function PageHeader({ heading }: { heading: string }) {
    return (
        <Box
            style={{
                borderBottom: "1px solid #334155",
                backdropFilter: "blur(8px)",
            }}
        >
            <Container size="xl" py="md">
                <Group justify="space-between">
                    <Group>
                        <Anchor component={Link} href="/" c="gray.4" style={{ textDecoration: "none" }}>
                            <Group gap="xs">
                                <IconArrowLeft size={16} />
                                <Text size="sm">Back to Home</Text>
                            </Group>
                        </Anchor>
                        <ThemeIcon size="lg" variant="gradient" gradient={{ from: "teal", to: "green" }}>
                            <IconCode size={20} />
                        </ThemeIcon>
                        <Title order={2} c="white">
                            {heading}
                        </Title>
                    </Group>

                </Group>
            </Container>
        </Box>

    )
}
