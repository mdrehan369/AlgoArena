'use client';

import { auth } from '@lib/auth';
import { useSession } from '@lib/auth-client';
import {
    Card,
    Title,
    Text,
    Group,
    Stack,
    Avatar,
    Badge,
    ActionIcon,
    Anchor,
} from '@mantine/core';
import {
    IconCode,
    IconCalendar,
    IconMapPin,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
} from '@tabler/icons-react';
import { formatDate } from '@utils/dateUtils';

export default function ProfileCard() {
    const session = useSession();
    const user = session.data?.user as typeof auth.$Infer.Session.user;

    return (
        !session.isPending &&
        session.data?.user && (
            <Card
                padding="xl"
                style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #475569',
                }}
            >
                <Stack align="center" gap="md">
                    <Avatar src={user?.image} size={120} radius="xl" />

                    <Stack align="center" gap="xs">
                        <Title order={2} c="white" ta="center">
                            {user?.name}
                        </Title>
                        <Text c="teal" fw={600}>
                            @{user?.email}
                        </Text>
                        {/* <Group gap="xs"> */}
                        {/*   <Badge variant="gradient" gradient={{ from: "teal", to: "blue" }}> */}
                        {/*     Rating: {user.rating} */}
                        {/*   </Badge> */}
                        {/*   <Badge variant="light" color="yellow"> */}
                        {/*     Rank #{user.globalRank} */}
                        {/*   </Badge> */}
                        {/* </Group> */}
                    </Stack>

                    {user.bio && (
                        <Text
                            c="gray.3"
                            size="sm"
                            ta="center"
                            style={{ lineHeight: 1.5 }}
                        >
                            {user.bio.toString()}
                        </Text>
                    )}

                    <Stack gap="xs" w="100%">
                        {user.location && (
                            <Group gap="xs">
                                <IconMapPin size={16} color="#6b7280" />
                                <Text c="gray.3" size="sm">
                                    {user.location.toString()}
                                </Text>
                            </Group>
                        )}

                        <Group gap="xs">
                            <IconCalendar size={16} color="#6b7280" />
                            <Text c="gray.3" size="sm">
                                Joined {formatDate(user.createdAt.toString())}
                            </Text>
                        </Group>
                    </Stack>

                    <Group gap="md" mt="md">
                        {user.github && (
                            <ActionIcon
                                component="a"
                                href={user.github.toString()}
                                target="_blank"
                                variant="subtle"
                                color="gray"
                                size="lg"
                            >
                                <IconBrandGithub size={20} />
                            </ActionIcon>
                        )}
                        {user.linkedin && (
                            <ActionIcon
                                component="a"
                                href={user.linkedin.toString()}
                                target="_blank"
                                variant="subtle"
                                color="gray"
                                size="lg"
                            >
                                <IconBrandLinkedin size={20} />
                            </ActionIcon>
                        )}
                        {user.x && (
                            <ActionIcon
                                component="a"
                                href={user.x.toString()}
                                target="_blank"
                                variant="subtle"
                                color="gray"
                                size="lg"
                            >
                                <IconBrandTwitter size={20} />
                            </ActionIcon>
                        )}
                    </Group>
                </Stack>
            </Card>
        )
    );
}
