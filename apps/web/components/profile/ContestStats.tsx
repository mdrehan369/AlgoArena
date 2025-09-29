import { Badge, Card, Group, Stack, Text, Title } from '@mantine/core';
import { IconCalendar, IconTrendingUp, IconTrophy } from '@tabler/icons-react';
import { formatDate } from '@utils/dateUtils';

interface Contest {
    id: number;
    title: string;
    rank: number;
    rating: number;
    ratingChange: number;
    participatedAt: string;
}

// Mock data based on your schema
const mockUser = {
    id: 1,
    username: 'codeMaster2024',
    email: 'codemaster@example.com',
    fullName: 'Alex Johnson',
    bio: 'Passionate competitive programmer with 3+ years of experience. Love solving algorithmic challenges and participating in contests. Currently working as a Software Engineer at TechCorp.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    githubUsername: 'alexjohnson',
    linkedinUsername: 'alex-johnson-dev',
    twitterUsername: 'alexcodes',
    profilePicture: '/placeholder.svg?key=xyfn5',
    createdAt: '2023-01-15T00:00:00Z',
    totalSolved: 247,
    currentStreak: 15,
    maxStreak: 42,
    globalRank: 1247,
    rating: 1856,
    contestsParticipated: 28,
    contestsWon: 3,
};

const mockContests: Contest[] = [
    {
        id: 1,
        title: 'Weekly Contest 378',
        rank: 156,
        rating: 1856,
        ratingChange: +24,
        participatedAt: '2024-01-14T00:00:00Z',
    },
    {
        id: 2,
        title: 'Biweekly Contest 120',
        rank: 89,
        rating: 1832,
        ratingChange: +18,
        participatedAt: '2024-01-07T00:00:00Z',
    },
    {
        id: 3,
        title: 'Weekly Contest 377',
        rank: 234,
        rating: 1814,
        ratingChange: -12,
        participatedAt: '2023-12-31T00:00:00Z',
    },
];
export default function ContestStats() {
    return (
        <Card
            padding="lg"
            style={{
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid #475569',
            }}
        >
            <Group justify="space-between" mb="lg">
                <Title order={3} c="white">
                    Contest History
                </Title>
                <Group gap="md">
                    <Stack align="center" gap={0}>
                        <Text c="white" fw={600} size="lg">
                            {mockUser.rating}
                        </Text>
                        <Text c="gray.4" size="xs">
                            Current Rating
                        </Text>
                    </Stack>
                    <Stack align="center" gap={0}>
                        <Text c="white" fw={600} size="lg">
                            {mockUser.contestsParticipated}
                        </Text>
                        <Text c="gray.4" size="xs">
                            Participated
                        </Text>
                    </Stack>
                </Group>
            </Group>

            <Stack gap="md">
                {mockContests.map((contest) => (
                    <Card
                        key={contest.id}
                        padding="md"
                        style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                            border: '1px solid #374151',
                        }}
                    >
                        <Group justify="space-between">
                            <Stack gap="xs">
                                <Text c="white" fw={600}>
                                    {contest.title}
                                </Text>
                                <Group gap="md">
                                    <Group gap="xs">
                                        <IconTrophy size={16} color="#6b7280" />
                                        <Text c="gray.3" size="sm">
                                            Rank #{contest.rank}
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <IconCalendar
                                            size={16}
                                            color="#6b7280"
                                        />
                                        <Text c="gray.3" size="sm">
                                            {formatDate(contest.participatedAt)}
                                        </Text>
                                    </Group>
                                </Group>
                            </Stack>

                            <Group gap="md">
                                <Stack align="center" gap={0}>
                                    <Text c="white" fw={600}>
                                        {contest.rating}
                                    </Text>
                                    <Text c="gray.4" size="xs">
                                        Rating
                                    </Text>
                                </Stack>
                                <Badge
                                    variant="light"
                                    color={
                                        contest.ratingChange >= 0
                                            ? 'green'
                                            : 'red'
                                    }
                                    leftSection={
                                        <IconTrendingUp
                                            size={12}
                                            style={{
                                                transform:
                                                    contest.ratingChange < 0
                                                        ? 'rotate(180deg)'
                                                        : 'none',
                                            }}
                                        />
                                    }
                                >
                                    {contest.ratingChange >= 0 ? '+' : ''}
                                    {contest.ratingChange}
                                </Badge>
                            </Group>
                        </Group>
                    </Card>
                ))}
            </Stack>
        </Card>
    );
}
