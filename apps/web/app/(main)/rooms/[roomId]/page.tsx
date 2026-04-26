'use client';

import {
    Container,
    Grid,
    Card,
    Button,
    Text,
    Title,
    Group,
    Stack,
    Avatar,
    Badge,
    Tabs,
    Progress,
    ActionIcon,
    Tooltip,
    Modal,
    TextInput,
    CopyButton,
    Alert,
    SimpleGrid,
    Center,
} from '@mantine/core';
import {
    IconClock,
    IconUsers,
    IconTrophy,
    IconShare2,
    IconCopy,
    IconCheck,
    IconX,
    IconAlertCircle,
    IconCode,
    IconFlag,
} from '@tabler/icons-react';
import { useState, useEffect, use } from 'react';

export default function BattleRoomPage({
    params,
}: {
    params: Promise<{ roomId: string }>;
}) {
    const [timeLeft, setTimeLeft] = useState(1845); // 30:45 in seconds
    const [opened, setOpened] = useState(false);

    const { roomId } = use(params);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const mockLeaderboard = [
        {
            rank: 1,
            name: 'John Doe',
            avatar: null,
            score: 3500,
            solved: 4,
            totalProblems: 5,
            lastSolveTime: '12:35',
            isCurrentUser: false,
        },
        {
            rank: 2,
            name: 'Sarah Chen',
            avatar: null,
            score: 3200,
            solved: 4,
            totalProblems: 5,
            lastSolveTime: '15:42',
            isCurrentUser: true,
        },
        {
            rank: 3,
            name: 'Mike Johnson',
            avatar: null,
            score: 2800,
            solved: 3,
            totalProblems: 5,
            lastSolveTime: '18:20',
            isCurrentUser: false,
        },
        {
            rank: 4,
            name: 'Emma Wilson',
            avatar: null,
            score: 2400,
            solved: 3,
            totalProblems: 5,
            lastSolveTime: '22:15',
            isCurrentUser: false,
        },
        {
            rank: 5,
            name: 'Alex Kumar',
            avatar: null,
            score: 1800,
            solved: 2,
            totalProblems: 5,
            lastSolveTime: '28:40',
            isCurrentUser: false,
        },
    ];

    const mockProblems = [
        {
            id: 1,
            title: 'Two Sum',
            difficulty: 'STARTER',
            solvedBy: 7,
            totalParticipants: 7,
            yourStatus: 'SOLVED',
        },
        {
            id: 2,
            title: 'Best Time to Buy and Sell Stock',
            difficulty: 'APPRENTICE',
            solvedBy: 6,
            totalParticipants: 7,
            yourStatus: 'SOLVED',
        },
        {
            id: 3,
            title: 'Longest Substring Without Repeating Characters',
            difficulty: 'APPRENTICE',
            solvedBy: 4,
            totalParticipants: 7,
            yourStatus: 'ATTEMPTED',
        },
        {
            id: 4,
            title: 'Trapping Rain Water',
            difficulty: 'CHALLENGER',
            solvedBy: 2,
            totalParticipants: 7,
            yourStatus: 'NOT_ATTEMPTED',
        },
        {
            id: 5,
            title: 'Regular Expression Matching',
            difficulty: 'EXPERT',
            solvedBy: 1,
            totalParticipants: 7,
            yourStatus: 'NOT_ATTEMPTED',
        },
    ];

    const getRankMedal = (rank: number) => {
        const medals: Record<number, string> = {
            1: '🥇',
            2: '🥈',
            3: '🥉',
        };
        return medals[rank] || rank.toString();
    };

    const getDifficultyColor = (difficulty: string) => {
        const colors: Record<string, string> = {
            STARTER: 'teal',
            APPRENTICE: 'blue',
            CHALLENGER: 'violet',
            EXPERT: 'orange',
            LEGENDARY: 'red',
        };
        return colors[difficulty] || 'gray';
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { color: string; icon: any }> = {
            SOLVED: { color: 'teal', icon: IconCheck },
            ATTEMPTED: { color: 'yellow', icon: IconAlertCircle },
            NOT_ATTEMPTED: { color: 'gray', icon: IconX },
        };
        return statusConfig[status] || { color: 'gray', icon: IconX };
    };

    return (
        <Container size="xl" py="xl">
            {/* Room Header */}
            <Card withBorder mb="xl" p="lg">
                <Group justify="space-between" mb="md">
                    <div>
                        <Title order={1}>Expert Code Battle Arena</Title>
                        <Group gap="xs" mt="xs">
                            <Badge size="lg" color="violet">
                                EXPERT
                            </Badge>
                            <Text c="dimmed">Hosted by Emma Wilson</Text>
                        </Group>
                    </div>
                    <Stack gap="xs" align="flex-end">
                        <CopyButton value={`ROOM-${roomId}`}>
                            {({ copied, copy }) => (
                                <Tooltip
                                    label={copied ? 'Copied' : 'Copy room code'}
                                    withArrow
                                >
                                    <ActionIcon
                                        color={copied ? 'teal' : 'gray'}
                                        variant="light"
                                        onClick={copy}
                                    >
                                        {copied ? (
                                            <IconCheck size={18} />
                                        ) : (
                                            <IconCopy size={18} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                        <Text fw={700} size="xl" c="teal">
                            {formatTime(timeLeft)}
                        </Text>
                    </Stack>
                </Group>

                {/* Room Stats */}
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
                    <Group gap="xs">
                        <IconUsers
                            size={20}
                            color="var(--mantine-color-teal-6)"
                        />
                        <Stack gap="0">
                            <Text size="xs" c="dimmed">
                                Participants
                            </Text>
                            <Text fw={500}>7 / 10</Text>
                        </Stack>
                    </Group>
                    <Group gap="xs">
                        <IconCode
                            size={20}
                            color="var(--mantine-color-teal-6)"
                        />
                        <Stack gap="0">
                            <Text size="xs" c="dimmed">
                                Problems
                            </Text>
                            <Text fw={500}>5</Text>
                        </Stack>
                    </Group>
                    <Group gap="xs">
                        <IconFlag
                            size={20}
                            color="var(--mantine-color-teal-6)"
                        />
                        <Stack gap="0">
                            <Text size="xs" c="dimmed">
                                Your Rank
                            </Text>
                            <Text fw={500}>#2</Text>
                        </Stack>
                    </Group>
                    <Group gap="xs">
                        <IconTrophy
                            size={20}
                            color="var(--mantine-color-teal-6)"
                        />
                        <Stack gap="0">
                            <Text size="xs" c="dimmed">
                                Your Score
                            </Text>
                            <Text fw={500}>3200</Text>
                        </Stack>
                    </Group>
                </SimpleGrid>
            </Card>

            {/* Main Content */}
            <Grid gutter="lg">
                {/* Left Column - Problems & Leaderboard */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Tabs defaultValue="problems" orientation="horizontal">
                        <Tabs.List>
                            <Tabs.Tab
                                value="problems"
                                leftSection={<IconCode size={14} />}
                            >
                                Problems
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="leaderboard"
                                leftSection={<IconTrophy size={14} />}
                            >
                                Live Leaderboard
                            </Tabs.Tab>
                        </Tabs.List>

                        {/* Problems Tab */}
                        <Tabs.Panel value="problems" pt="md">
                            <Stack gap="md">
                                {mockProblems.map((problem) => {
                                    const statusConfig = getStatusBadge(
                                        problem.yourStatus,
                                    );
                                    const StatusIcon = statusConfig.icon;
                                    return (
                                        <Card
                                            key={problem.id}
                                            withBorder
                                            p="md"
                                        >
                                            <Group
                                                justify="space-between"
                                                mb="md"
                                            >
                                                <div>
                                                    <Group gap="xs">
                                                        <StatusIcon
                                                            size={20}
                                                            color={
                                                                statusConfig.color
                                                            }
                                                        />
                                                        <Title order={4}>
                                                            {problem.title}
                                                        </Title>
                                                    </Group>
                                                    <Badge
                                                        size="sm"
                                                        color={getDifficultyColor(
                                                            problem.difficulty,
                                                        )}
                                                        mt="xs"
                                                    >
                                                        {problem.difficulty}
                                                    </Badge>
                                                </div>
                                                <Button
                                                    component="a"
                                                    href={`/problems/${problem.id}`}
                                                    variant="light"
                                                    color="teal"
                                                >
                                                    Solve
                                                </Button>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm" c="dimmed">
                                                    Solved by {problem.solvedBy}{' '}
                                                    /{' '}
                                                    {problem.totalParticipants}{' '}
                                                    participants
                                                </Text>
                                                <Progress
                                                    value={
                                                        (problem.solvedBy /
                                                            problem.totalParticipants) *
                                                        100
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        marginLeft: '1rem',
                                                    }}
                                                    color="teal"
                                                    size="sm"
                                                />
                                            </Group>
                                        </Card>
                                    );
                                })}
                            </Stack>
                        </Tabs.Panel>

                        {/* Leaderboard Tab */}
                        <Tabs.Panel value="leaderboard" pt="md">
                            <Stack gap="md">
                                {mockLeaderboard.map((entry) => (
                                    <Card
                                        key={entry.rank}
                                        withBorder
                                        p="md"
                                        bg={
                                            entry.isCurrentUser
                                                ? 'var(--mantine-color-teal-9)'
                                                : undefined
                                        }
                                        style={{
                                            borderWidth: entry.isCurrentUser
                                                ? 2
                                                : 1,
                                            borderColor: entry.isCurrentUser
                                                ? 'var(--mantine-color-teal-6)'
                                                : undefined,
                                        }}
                                    >
                                        <Group justify="space-between">
                                            <Group gap="md">
                                                <Center
                                                    fw={700}
                                                    bg="var(--mantine-color-dark-6)"
                                                    style={{
                                                        borderRadius: '50%',
                                                        width: 28,
                                                    }}
                                                >
                                                    {getRankMedal(entry.rank)}
                                                </Center>
                                                <Stack gap="0">
                                                    <Group gap="xs">
                                                        <Text fw={600}>
                                                            {entry.name}
                                                        </Text>
                                                        {entry.isCurrentUser && (
                                                            <Badge
                                                                size="sm"
                                                                color="teal"
                                                            >
                                                                YOU
                                                            </Badge>
                                                        )}
                                                    </Group>
                                                    <Text size="sm" c="dimmed">
                                                        Solved {entry.solved} /{' '}
                                                        {entry.totalProblems}{' '}
                                                        problems
                                                    </Text>
                                                </Stack>
                                            </Group>

                                            <Group gap="xl">
                                                <Stack gap="0" align="center">
                                                    <Text size="sm" c="dimmed">
                                                        Last Solve
                                                    </Text>
                                                    <Text fw={500}>
                                                        {entry.lastSolveTime}
                                                    </Text>
                                                </Stack>
                                                <Stack gap="0" align="center">
                                                    <Text size="sm" c="dimmed">
                                                        Score
                                                    </Text>
                                                    <Text
                                                        fw={700}
                                                        size="xl"
                                                        c="teal"
                                                    >
                                                        {entry.score}
                                                    </Text>
                                                </Stack>
                                            </Group>
                                        </Group>
                                    </Card>
                                ))}
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>

                {/* Right Column - Room Info */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack gap="md">
                        {/* Participants */}
                        <Card withBorder title="Participants">
                            <Stack gap="md">
                                {mockLeaderboard.map((participant) => (
                                    <Group
                                        key={participant.name}
                                        justify="space-between"
                                    >
                                        <Group gap="xs">
                                            <Avatar
                                                name={participant.name}
                                                size="sm"
                                            />
                                            <Stack gap="0">
                                                <Text size="sm" fw={500}>
                                                    {participant.name}
                                                </Text>
                                                <Text size="xs" c="dimmed">
                                                    {participant.solved} solved
                                                </Text>
                                            </Stack>
                                        </Group>
                                        <Badge color="teal" variant="dot">
                                            #{participant.rank}
                                        </Badge>
                                    </Group>
                                ))}
                            </Stack>
                        </Card>

                        {/* Invite Friends */}
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            color="teal"
                            title="Invite Friends"
                        >
                            <Stack gap="sm">
                                <Text size="sm">
                                    Share the room code to invite friends
                                </Text>
                                <CopyButton value={`ROOM-${roomId}`}>
                                    {({ copied, copy }) => (
                                        <Button
                                            size="sm"
                                            color={copied ? 'teal' : 'gray'}
                                            onClick={copy}
                                            leftSection={
                                                copied ? (
                                                    <IconCheck size={16} />
                                                ) : (
                                                    <IconCopy size={16} />
                                                )
                                            }
                                        >
                                            {copied
                                                ? 'Copied!'
                                                : `Copy: ROOM-${roomId}`}
                                        </Button>
                                    )}
                                </CopyButton>
                            </Stack>
                        </Alert>

                        {/* Battle Status */}
                        <Card withBorder title="Battle Status">
                            <Stack gap="sm">
                                <Group justify="space-between">
                                    <Text size="sm" c="dimmed">
                                        Status
                                    </Text>
                                    <Badge color="green">ONGOING</Badge>
                                </Group>
                                <Group justify="space-between">
                                    <Text size="sm" c="dimmed">
                                        Time Remaining
                                    </Text>
                                    <Text fw={600} c="teal">
                                        {formatTime(timeLeft)}
                                    </Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text size="sm" c="dimmed">
                                        Your Position
                                    </Text>
                                    <Text fw={600}>🥈 Rank #2</Text>
                                </Group>
                            </Stack>
                        </Card>

                        {/* Leave Room */}
                        <Button variant="light" color="red" fullWidth>
                            Leave Room
                        </Button>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
