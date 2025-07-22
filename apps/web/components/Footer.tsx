"use client"

import {
    Container,
    Title,
    Text,
    Group,
    Stack,
    Grid,
    Anchor,
    Divider,
    Box,
    ThemeIcon,
    ActionIcon,
} from "@mantine/core"
import {
    IconCode,
    IconBrandGithub,
    IconBrandTwitter,
    IconBrandDiscord,
} from "@tabler/icons-react"


export default function Footer() {
    return (
        <Box style={{ backgroundColor: "#0f172a", borderTop: "1px solid #334155" }}>
            <Container size="xl" py={48}>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group mb="md">
                            <ThemeIcon size="lg" variant="gradient" gradient={{ from: "teal", to: "green" }}>
                                <IconCode size={20} />
                            </ThemeIcon>
                            <Title order={2} c="white">
                                Algo Arena
                            </Title>
                        </Group>
                        <Text c="gray.4" mb="lg" maw={400}>
                            The ultimate competitive programming platform where coders solve problems, compete globally, and create
                            their own competitions.
                        </Text>
                        <Group>
                            <ActionIcon variant="subtle" color="gray" size="lg">
                                <IconBrandGithub size={20} />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="gray" size="lg">
                                <IconBrandTwitter size={20} />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="gray" size="lg">
                                <IconBrandDiscord size={20} />
                            </ActionIcon>
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, md: 3 }}>
                        <Title order={4} c="white" mb="md">
                            Platform
                        </Title>
                        <Stack gap="xs">
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                Problems
                            </Anchor>
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                Competitions
                            </Anchor>
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                Leaderboards
                            </Anchor>
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                Community
                            </Anchor>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, md: 3 }}>
                        <Title order={4} c="white" mb="md">
                            Company
                        </Title>
                        <Stack gap="xs">
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                About
                            </Anchor>
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                Blog
                            </Anchor>
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                Careers
                            </Anchor>
                            <Anchor href="#" c="gray.4" style={{ textDecoration: "none" }}>
                                Contact
                            </Anchor>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Divider my="xl" color="gray.7" />

                <Group justify="space-between">
                    <Text c="gray.4" size="sm">
                        © {new Date().getFullYear()} Algo Arena. All rights reserved.
                    </Text>
                    <Group>
                        <Anchor href="#" c="gray.4" size="sm" style={{ textDecoration: "none" }}>
                            Privacy Policy
                        </Anchor>
                        <Anchor href="#" c="gray.4" size="sm" style={{ textDecoration: "none" }}>
                            Terms of Service
                        </Anchor>
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}
