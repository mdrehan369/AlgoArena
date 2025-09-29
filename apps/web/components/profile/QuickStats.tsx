'use client';
import { Card, Title, Text, Stack, SimpleGrid, ThemeIcon } from '@mantine/core';
import {
    IconMedal,
    IconFlame,
    IconUsers,
    IconTrophy,
} from '@tabler/icons-react';

const mockUser = {
    totalSolved: 20,
    currentStreak: 10,
    contestsWon: 3,
    contestsParticipated: 5,
};

export default function QuickStats() {
    return (
        <Card
            padding="lg"
            style={{
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid #475569',
            }}
        >
            <Title order={4} c="white" mb="md">
                Quick Stats
            </Title>
            <SimpleGrid cols={2} spacing="md">
                <Stack align="center" gap="xs">
                    <ThemeIcon size={40} variant="light" color="teal">
                        <IconTrophy size={20} />
                    </ThemeIcon>
                    <Text c="white" fw={600} size="lg">
                        {mockUser.totalSolved}
                    </Text>
                    <Text c="gray.4" size="xs" ta="center">
                        Problems Solved
                    </Text>
                </Stack>

                <Stack align="center" gap="xs">
                    <ThemeIcon size={40} variant="light" color="orange">
                        <IconFlame size={20} />
                    </ThemeIcon>
                    <Text c="white" fw={600} size="lg">
                        {mockUser.currentStreak}
                    </Text>
                    <Text c="gray.4" size="xs" ta="center">
                        Current Streak
                    </Text>
                </Stack>

                <Stack align="center" gap="xs">
                    <ThemeIcon size={40} variant="light" color="blue">
                        <IconUsers size={20} />
                    </ThemeIcon>
                    <Text c="white" fw={600} size="lg">
                        {mockUser.contestsParticipated}
                    </Text>
                    <Text c="gray.4" size="xs" ta="center">
                        Contests
                    </Text>
                </Stack>

                <Stack align="center" gap="xs">
                    <ThemeIcon size={40} variant="light" color="yellow">
                        <IconMedal size={20} />
                    </ThemeIcon>
                    <Text c="white" fw={600} size="lg">
                        {mockUser.contestsWon}
                    </Text>
                    <Text c="gray.4" size="xs" ta="center">
                        Contests Won
                    </Text>
                </Stack>
            </SimpleGrid>
        </Card>
    );
}
