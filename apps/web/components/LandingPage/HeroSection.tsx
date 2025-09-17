import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Badge,
    Box,
    SimpleGrid,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

export default function HeroSection() {
    return (
        <Box
            style={{
                background:
                    'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                position: 'relative',
            }}
        >
            <Container size="xl" py={120}>
                <Stack align="center" gap="xl">
                    <Badge size="lg" variant="light" color="teal">
                        🚀 Now in Beta - Join the Arena!
                    </Badge>

                    <Title
                        order={1}
                        size={72}
                        fw={900}
                        ta="center"
                        c="white"
                        style={{
                            lineHeight: 1.1,
                            maxWidth: '800px',
                        }}
                    >
                        Code. Compete.{' '}
                        <Text
                            span
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'blue' }}
                            inherit
                        >
                            Create.
                        </Text>
                    </Title>

                    <Text size="xl" ta="center" c="gray.3" maw={700}>
                        The ultimate competitive programming platform where you
                        don&apos;t just solve problems—
                        <Text span c="teal" fw={600}>
                            {' '}
                            you create competitions
                        </Text>{' '}
                        and build a community of elite coders.
                    </Text>

                    <Group>
                        <Button
                            size="lg"
                            color="teal"
                            rightSection={<IconArrowRight size={20} />}
                        >
                            Start Coding Now
                        </Button>
                    </Group>

                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt="xl">
                        <Stack align="center">
                            <Title order={2} c="teal">
                                10K+
                            </Title>
                            <Text c="gray.4">Problems</Text>
                        </Stack>
                        <Stack align="center">
                            <Title order={2} c="teal">
                                500+
                            </Title>
                            <Text c="gray.4">Active Competitions</Text>
                        </Stack>
                        <Stack align="center">
                            <Title order={2} c="teal">
                                2K+
                            </Title>
                            <Text c="gray.4">Elite Coders</Text>
                        </Stack>
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    );
}
