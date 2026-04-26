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
    TextInput,
    SimpleGrid,
    ActionIcon,
    Modal,
    Select,
    MultiSelect,
    NumberInput,
} from '@mantine/core';
import {
    IconPlus,
    IconSearch,
    IconClock,
    IconUsers,
    IconTrophy,
    IconFile,
    IconShare2,
    IconCopy,
    IconCheck,
} from '@tabler/icons-react';
import { primaryColors, secondaryColors } from '@utils/colors';
import { useState } from 'react';

export default function RoomsPage() {
    const [opened, setOpened] = useState(false);
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState<any>({
        roomName: '',
        difficulty: '',
        duration: 60,
        selectedFriends: [],
        isPrivate: true,
    });

    const mockRooms = [
        {
            id: 'ROOM-001',
            name: 'Afternoon Code Battle',
            host: { name: 'Alex Johnson', avatar: null },
            participants: 5,
            maxParticipants: 8,
            difficulty: 'APPRENTICE',
            timeRemaining: '45 mins',
            status: 'ONGOING',
            topScorer: { name: 'Sarah Chen', score: 1250 },
        },
        {
            id: 'ROOM-002',
            name: 'DP Challenge',
            host: { name: 'Mike Chen', avatar: null },
            participants: 3,
            maxParticipants: 6,
            difficulty: 'CHALLENGER',
            timeRemaining: '1h 15m',
            status: 'ONGOING',
            topScorer: { name: 'Mike Chen', score: 2100 },
        },
        {
            id: 'ROOM-003',
            name: 'Friends Only - Weekend War',
            host: { name: 'Emma Wilson', avatar: null },
            participants: 7,
            maxParticipants: 10,
            difficulty: 'EXPERT',
            timeRemaining: '2h 30m',
            status: 'ONGOING',
            topScorer: { name: 'John Doe', score: 3500 },
        },
        {
            id: 'ROOM-004',
            name: 'Beginner Friendly Session',
            host: { name: 'Lisa Park', avatar: null },
            participants: 12,
            maxParticipants: 20,
            difficulty: 'STARTER',
            timeRemaining: '30 mins',
            status: 'ONGOING',
            topScorer: { name: 'Lisa Park', score: 890 },
        },
    ];

    const mockFriends = [
        { value: 'sarah', label: 'Sarah Chen' },
        { value: 'mike', label: 'Mike Chen' },
        { value: 'emma', label: 'Emma Wilson' },
        { value: 'john', label: 'John Doe' },
        { value: 'lisa', label: 'Lisa Park' },
    ];

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

    const handleCreateRoom = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setOpened(false);
    };

    return (
        <Container
            size="xl"
            py="xl"
            style={{
                backgroundColor: secondaryColors.DARKER,
            }}
        >
            {/* Header */}
            <Group justify="space-between" mb="xl">
                <div>
                    <Title c={primaryColors.DEFAULT} order={1}>
                        Battle Rooms
                    </Title>
                    <Text c={'white'} size="sm">
                        Challenge your friends in real-time coding competitions
                    </Text>
                </div>
                <Button
                    leftSection={<IconPlus size={18} />}
                    onClick={() => setOpened(true)}
                    size="md"
                    bg={secondaryColors.LIGHT}
                    c={primaryColors.DEFAULT}
                >
                    Create Room
                </Button>
            </Group>

            {/* Stats Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl">
                <Card bg={secondaryColors.LIGHT} c={primaryColors.DEFAULT}>
                    <Group justify="space-between">
                        <div>
                            <Text size="sm" c="dimmed">
                                Active Rooms
                            </Text>
                            <Text size="xl" fw={700}>
                                12
                            </Text>
                        </div>
                        <IconFile
                            size={32}
                            color="var(--mantine-color-teal-6)"
                        />
                    </Group>
                </Card>
                <Card bg={secondaryColors.LIGHT} c={primaryColors.DEFAULT}>
                    <Group justify="space-between">
                        <div>
                            <Text size="sm" c="dimmed">
                                Your Wins
                            </Text>
                            <Text size="xl" fw={700}>
                                8
                            </Text>
                        </div>
                        <IconTrophy
                            size={32}
                            color="var(--mantine-color-yellow-6)"
                        />
                    </Group>
                </Card>
                <Card bg={secondaryColors.LIGHT} c={primaryColors.DEFAULT}>
                    <Group justify="space-between">
                        <div>
                            <Text size="sm" c="dimmed">
                                Win Rate
                            </Text>
                            <Text size="xl" fw={700}>
                                72%
                            </Text>
                        </div>
                        <IconFile
                            size={32}
                            color="var(--mantine-color-red-6)"
                        />
                    </Group>
                </Card>
                <Card bg={secondaryColors.LIGHT} c={primaryColors.DEFAULT}>
                    <Group justify="space-between">
                        <div>
                            <Text size="sm" c="dimmed">
                                Current Streak
                            </Text>
                            <Text size="xl" fw={700}>
                                4
                            </Text>
                        </div>
                        <IconFile
                            size={32}
                            color="var(--mantine-color-orange-6)"
                        />
                    </Group>
                </Card>
            </SimpleGrid>

            {/* Active Rooms */}
            <div>
                <Title order={2} size="h3" mb="md" c={'white'}>
                    Active Rooms
                </Title>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                    {mockRooms.map((room) => (
                        <Card
                            key={room.id}
                            bg={secondaryColors.LIGHT}
                            c={primaryColors.DEFAULT}
                            p="lg"
                        >
                            <Stack gap="md">
                                {/* Room Header */}
                                <Group justify="space-between">
                                    <div>
                                        <Title order={4}>{room.name}</Title>
                                        <Group gap="xs" mt="xs">
                                            <Badge
                                                size="sm"
                                                color={getDifficultyColor(
                                                    room.difficulty,
                                                )}
                                            >
                                                {room.difficulty}
                                            </Badge>
                                            <Text size="xs" c="dimmed">
                                                Hosted by {room.host.name}
                                            </Text>
                                        </Group>
                                    </div>
                                </Group>

                                {/* Room Stats */}
                                <Group grow>
                                    <Group gap="xs">
                                        <IconClock
                                            size={16}
                                            color="var(--mantine-color-teal-6)"
                                        />
                                        <Stack gap="0">
                                            <Text size="xs" c="dimmed">
                                                Time Left
                                            </Text>
                                            <Text size="sm" fw={500}>
                                                {room.timeRemaining}
                                            </Text>
                                        </Stack>
                                    </Group>
                                    <Group gap="xs">
                                        <IconUsers
                                            size={16}
                                            color="var(--mantine-color-teal-6)"
                                        />
                                        <Stack gap="0">
                                            <Text size="xs" c="dimmed">
                                                Participants
                                            </Text>
                                            <Text size="sm" fw={500}>
                                                {room.participants}/
                                                {room.maxParticipants}
                                            </Text>
                                        </Stack>
                                    </Group>
                                </Group>

                                {/* Top Scorer */}
                                <Card p="sm" bg={secondaryColors.DEFAULT}>
                                    <Group justify="space-between">
                                        <Group gap="xs">
                                            <Avatar
                                                name={room.topScorer.name}
                                                size="sm"
                                            />
                                            <Stack gap="0">
                                                <Text size="xs" c="dimmed">
                                                    Leading
                                                </Text>
                                                <Text size="sm" fw={500}>
                                                    {room.topScorer.name}
                                                </Text>
                                            </Stack>
                                        </Group>
                                        <Text fw={700} size="lg">
                                            {room.topScorer.score}
                                        </Text>
                                    </Group>
                                </Card>

                                {/* Action Button */}
                                <Button
                                    component="a"
                                    href={`/rooms/${room.id}`}
                                    fullWidth
                                    variant="light"
                                    color="teal"
                                >
                                    Join Battle
                                </Button>
                            </Stack>
                        </Card>
                    ))}
                </SimpleGrid>
            </div>

            {/* Create Room Modal */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Create Battle Room"
                size="lg"
            >
                <Stack gap="md">
                    <TextInput
                        label="Room Name"
                        placeholder="e.g., Afternoon Code Battle"
                        value={formData.roomName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                roomName: e.currentTarget.value,
                            })
                        }
                    />

                    <Select
                        label="Difficulty Level"
                        placeholder="Select difficulty"
                        data={[
                            { value: 'STARTER', label: 'Starter' },
                            { value: 'APPRENTICE', label: 'Apprentice' },
                            { value: 'CHALLENGER', label: 'Challenger' },
                            { value: 'EXPERT', label: 'Expert' },
                            { value: 'LEGENDARY', label: 'Legendary' },
                        ]}
                        value={formData.difficulty}
                        onChange={(value) =>
                            setFormData({
                                ...formData,
                                difficulty: value || '',
                            })
                        }
                    />

                    <NumberInput
                        label="Duration (minutes)"
                        min={15}
                        max={180}
                        value={formData.duration}
                        onChange={(value) =>
                            setFormData({
                                ...formData,
                                duration: value as number,
                            })
                        }
                    />

                    <MultiSelect
                        label="Invite Friends"
                        placeholder="Select friends to invite"
                        data={mockFriends}
                        value={formData.selectedFriends}
                        onChange={(value) =>
                            setFormData({ ...formData, selectedFriends: value })
                        }
                        searchable
                    />

                    <Group grow>
                        <Button
                            variant="default"
                            onClick={() => setOpened(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleCreateRoom} color="teal">
                            Create Room
                        </Button>
                    </Group>

                    {copied && (
                        <Card bg="var(--mantine-color-teal-9)" p="sm">
                            <Group gap="xs">
                                <IconCheck size={20} />
                                <Stack gap="0">
                                    <Text fw={500} size="sm">
                                        Room Created!
                                    </Text>
                                    <Text size="xs">
                                        Share code <strong>ROOM-789ABC</strong>{' '}
                                        with friends
                                    </Text>
                                </Stack>
                            </Group>
                        </Card>
                    )}
                </Stack>
            </Modal>
        </Container>
    );
}
