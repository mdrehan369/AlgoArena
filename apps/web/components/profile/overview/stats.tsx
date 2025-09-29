import {
    Badge,
    Box,
    Card,
    Center,
    Group,
    Progress,
    RingProgress,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Tooltip,
} from '@mantine/core';
import { Level } from '@repo/db';
import { levelColors } from '@utils/constants';
import { formatDate } from '@utils/dateUtils';

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

const mockStats = {
    totalSubmissions: 892,
    acceptedSubmissions: 247,
    acceptanceRate: 27.7,
    problemsSolvedByLevel: {
        STARTER: 89,
        APPRENTICE: 76,
        CHALLENGER: 52,
        EXPERT: 24,
        LEGENDARY: 6,
    },
    problemsSolvedByTopic: {
        ARRAY: 45,
        STRING: 38,
        TWO_POINTERS: 22,
        SLIDING_WINDOW: 18,
        DYNAMIC_PROGRAMMING: 35,
        GRAPH: 28,
        BINARY_TREE: 31,
        GREEDY: 15,
        SORTING: 12,
        HASH_TABLE: 23,
    },
    recentActivity: [
        { date: '2024-01-20', problemsSolved: 3 },
        { date: '2024-01-19', problemsSolved: 2 },
        { date: '2024-01-18', problemsSolved: 4 },
        { date: '2024-01-17', problemsSolved: 1 },
        { date: '2024-01-16', problemsSolved: 2 },
        { date: '2024-01-15', problemsSolved: 3 },
        { date: '2024-01-14', problemsSolved: 0 },
    ],
    languageStats: [
        { language: 'C++', count: 156, percentage: 63.2 },
        { language: 'Python', count: 67, percentage: 27.1 },
        { language: 'JavaScript', count: 18, percentage: 7.3 },
        { language: 'C', count: 6, percentage: 2.4 },
    ],
};

export default function OverviewStats() {
    return (
        <Stack gap="lg">
            {/* Statistics Overview */}
            <Card
                padding="lg"
                style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #475569',
                }}
            >
                <Group justify="space-between" mb="lg">
                    <Title order={3} c="white">
                        Statistics Overview
                    </Title>
                    <Group gap="md">
                        <Stack align="center" gap={0}>
                            <Text c="white" fw={600} size="lg">
                                {mockStats.acceptanceRate.toFixed(1)}%
                            </Text>
                            <Text c="gray.4" size="xs">
                                Acceptance Rate
                            </Text>
                        </Stack>
                        <Stack align="center" gap={0}>
                            <Text c="white" fw={600} size="lg">
                                {mockStats.totalSubmissions}
                            </Text>
                            <Text c="gray.4" size="xs">
                                Total Submissions
                            </Text>
                        </Stack>
                    </Group>
                </Group>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                    {/* Problems by Level */}
                    <Stack gap="md">
                        <Text c="white" fw={600}>
                            Problems by Difficulty
                        </Text>
                        <Stack gap="sm">
                            {Object.entries(
                                mockStats.problemsSolvedByLevel,
                            ).map(([level, count]) => (
                                <Group key={level} justify="space-between">
                                    <Group gap="sm">
                                        <Badge
                                            color={levelColors[level as Level]}
                                            variant="light"
                                            size="sm"
                                        >
                                            {level}
                                        </Badge>
                                        <Text c="gray.3" size="sm">
                                            {count} solved
                                        </Text>
                                    </Group>
                                    <Progress
                                        value={
                                            (count / mockUser.totalSolved) * 100
                                        }
                                        w={100}
                                        size="sm"
                                        color={levelColors[level as Level]}
                                    />
                                </Group>
                            ))}
                        </Stack>
                    </Stack>

                    {/* Languages */}
                    <Stack gap="md">
                        <Text c="white" fw={600}>
                            Languages Used
                        </Text>
                        <Stack gap="sm">
                            {mockStats.languageStats.map((lang) => (
                                <Group
                                    key={lang.language}
                                    justify="space-between"
                                >
                                    <Group gap="sm">
                                        <Text c="white" size="sm" fw={500}>
                                            {lang.language}
                                        </Text>
                                        <Text c="gray.3" size="sm">
                                            {lang.count} problems
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <Progress
                                            value={lang.percentage}
                                            w={80}
                                            size="sm"
                                            color="teal"
                                        />
                                        <Text c="gray.3" size="xs" w={35}>
                                            {lang.percentage.toFixed(1)}%
                                        </Text>
                                    </Group>
                                </Group>
                            ))}
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Card>

            {/* Topics Breakdown */}
            <Card
                padding="lg"
                style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #475569',
                }}
            >
                <Title order={3} c="white" mb="lg">
                    Topics Mastery
                </Title>
                <SimpleGrid cols={{ base: 2, md: 3, lg: 5 }} spacing="md">
                    {Object.entries(mockStats.problemsSolvedByTopic).map(
                        ([topic, count]) => (
                            <Stack key={topic} align="center" gap="xs">
                                <RingProgress
                                    size={60}
                                    thickness={6}
                                    sections={[
                                        {
                                            value:
                                                (count /
                                                    Math.max(
                                                        ...Object.values(
                                                            mockStats.problemsSolvedByTopic,
                                                        ),
                                                    )) *
                                                100,
                                            color: 'teal',
                                        },
                                    ]}
                                    label={
                                        <Center>
                                            <Text c="white" fw={700} size="xs">
                                                {count}
                                            </Text>
                                        </Center>
                                    }
                                />
                                <Text c="gray.3" size="xs" ta="center">
                                    {topic.replace(/_/g, ' ')}
                                </Text>
                            </Stack>
                        ),
                    )}
                </SimpleGrid>
            </Card>

            {/* Recent Activity */}
            <Card
                padding="lg"
                style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #475569',
                }}
            >
                <Title order={3} c="white" mb="lg">
                    Recent Activity
                </Title>
                <Group gap="xs">
                    {mockStats.recentActivity.map((activity, index) => (
                        <Tooltip
                            key={index}
                            label={`${activity.problemsSolved} problems solved on ${formatDate(activity.date)}`}
                        >
                            <Box
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 2,
                                    backgroundColor:
                                        activity.problemsSolved > 0
                                            ? activity.problemsSolved >= 3
                                                ? '#14b8a6'
                                                : activity.problemsSolved >= 2
                                                  ? '#06b6d4'
                                                  : '#10b981'
                                            : '#374151',
                                }}
                            />
                        </Tooltip>
                    ))}
                </Group>
                <Text c="gray.4" size="xs" mt="sm">
                    Last 7 days activity
                </Text>
            </Card>
        </Stack>
    );
}
