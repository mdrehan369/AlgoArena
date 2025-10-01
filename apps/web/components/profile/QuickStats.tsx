'use client';
import CustomLoader from '@components/Loader';
import { Card, Title, Text, Stack, SimpleGrid, ThemeIcon } from '@mantine/core';
import {
    IconMedal,
    IconFlame,
    IconUsers,
    IconTrophy,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { QuickStatsKeys } from '@utils/constants';
import { getQuickStats } from 'queries/profile.queries';
import { QuickStats as QuickStatsType } from 'types/Profile.types';

export default function QuickStats() {
    const { data, isLoading } = useQuery<QuickStatsType>({
        queryKey: QuickStatsKeys,
        queryFn: getQuickStats,
    });
    return !isLoading ? (
        data && (
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
                            {data.problemsSolved}
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
                            {data.getCurrStreak}
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
                            {5}
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
                            {3}
                        </Text>
                        <Text c="gray.4" size="xs" ta="center">
                            Contests Won
                        </Text>
                    </Stack>
                </SimpleGrid>
            </Card>
        )
    ) : (
        <CustomLoader />
    );
}
