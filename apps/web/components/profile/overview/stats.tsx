import CustomLoader from '@components/Loader';
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
import { Language, Level, Topic } from '@repo/db';
import { useQuery } from '@tanstack/react-query';
import { levelColors, OverviewStatsKeys } from '@utils/constants';
import { formatDate } from '@utils/dateUtils';
import { getOverviewStats } from 'queries/profile.queries';
import { OverviewStats as OverviewStatsType } from 'types/Profile.types';

export default function OverviewStats() {
    const { data, isLoading } = useQuery<OverviewStatsType>({
        queryKey: OverviewStatsKeys,
        queryFn: getOverviewStats,
    });

    return !isLoading ? (
        data && (
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
                                    {data?.acceptanceRate.toFixed(1)}%
                                </Text>
                                <Text c="gray.4" size="xs">
                                    Acceptance Rate
                                </Text>
                            </Stack>
                            <Stack align="center" gap={0}>
                                <Text c="white" fw={600} size="lg">
                                    {data?.totalSubmissions}
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
                                    data.problemsSolvedByDifficulty,
                                ).map(([level, count]) => (
                                    <Group key={level} justify="space-between">
                                        <Group gap="sm">
                                            <Badge
                                                color={
                                                    levelColors[level as Level]
                                                }
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
                                                (count / data.problemsSolved) *
                                                100
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
                                {Object.keys(
                                    data.problemsSolvedByLanguages,
                                ).map((lang) => (
                                    <Group key={lang} justify="space-between">
                                        <Group gap="sm">
                                            <Text c="white" size="sm" fw={500}>
                                                {lang}
                                            </Text>
                                            <Text c="gray.3" size="sm">
                                                {
                                                    data
                                                        .problemsSolvedByLanguages[
                                                        lang as Language
                                                    ]
                                                }{' '}
                                                problems
                                            </Text>
                                        </Group>
                                        <Group gap="xs">
                                            <Progress
                                                value={
                                                    (data
                                                        .problemsSolvedByLanguages[
                                                        lang as Language
                                                    ] /
                                                        data.problemsSolved) *
                                                    100
                                                }
                                                w={80}
                                                size="sm"
                                                color="teal"
                                            />
                                            <Text c="gray.3" size="xs" w={35}>
                                                {(data
                                                    .problemsSolvedByLanguages[
                                                    lang as Language
                                                ] /
                                                    data.problemsSolved) *
                                                    100}
                                                %
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
                        {Object.keys(data.problemsSolvedByTopics).map(
                            (topic) => (
                                <Stack key={topic} align="center" gap="xs">
                                    <RingProgress
                                        size={60}
                                        thickness={6}
                                        sections={[
                                            {
                                                value:
                                                    (data
                                                        .problemsSolvedByTopics[
                                                        topic as Topic
                                                    ] /
                                                        Math.max(
                                                            ...Object.values(
                                                                data.problemsSolvedByTopics,
                                                            ),
                                                        )) *
                                                    100,
                                                color: 'teal',
                                            },
                                        ]}
                                        label={
                                            <Center>
                                                <Text
                                                    c="white"
                                                    fw={700}
                                                    size="xs"
                                                >
                                                    {
                                                        data
                                                            .problemsSolvedByTopics[
                                                            topic as Topic
                                                        ]
                                                    }
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
                        {Object.keys(data.recentActivity).map(
                            (activity, index) => (
                                <Tooltip
                                    key={index}
                                    label={`${data.recentActivity[activity]} problems solved on ${formatDate(new Date(activity).toISOString())}`}
                                >
                                    <Box
                                        style={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: 2,
                                            backgroundColor:
                                                data.recentActivity[activity]! >
                                                0
                                                    ? data.recentActivity[
                                                          activity
                                                      ]! >= 3
                                                        ? '#14b8a6'
                                                        : data.recentActivity[
                                                                activity
                                                            ]! >= 2
                                                          ? '#06b6d4'
                                                          : '#10b981'
                                                    : '#374151',
                                        }}
                                    />
                                </Tooltip>
                            ),
                        )}
                    </Group>
                    <Text c="gray.4" size="xs" mt="sm">
                        Last 10 days activity
                    </Text>
                </Card>
            </Stack>
        )
    ) : (
        <CustomLoader />
    );
}
