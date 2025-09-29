'use client';

import PageHeader from '@components/PageHeader';
import EditModal from '@components/profile/EditProfileModal';
import ProfileCard from '@components/profile/ProfileCard';
import QuickStats from '@components/profile/QuickStats';
import {
    Container,
    Grid,
    Button,
    Group,
    Stack,
    Box,
    Tabs,
    ActionIcon,
} from '@mantine/core';
import { IconEdit, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import OverviewStats from './profile/overview/stats';
import ContestStats from './profile/ContestStats';
import SubmissionStats from './profile/SubmissionStats';

export default function ProfilePage() {
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Box style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
            <PageHeader
                heading="Profile"
                action={
                    <Group>
                        <Button
                            leftSection={<IconEdit size={16} />}
                            variant="outline"
                            color="teal"
                            onClick={() => setEditModalOpened(true)}
                        >
                            Edit Profile
                        </Button>
                        <ActionIcon variant="subtle" color="gray" size="lg">
                            <IconSettings size={20} />
                        </ActionIcon>
                    </Group>
                }
            />

            <Container size="xl" py="xl">
                <Grid>
                    <Grid.Col span={{ base: 12, lg: 4 }}>
                        <Stack gap="lg">
                            <ProfileCard />
                            <QuickStats />
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, lg: 8 }}>
                        <Tabs
                            value={activeTab}
                            onChange={(val) => setActiveTab(val || '')}
                            color="teal"
                        >
                            <Tabs.List>
                                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                                <Tabs.Tab value="submissions">
                                    Submissions
                                </Tabs.Tab>
                                <Tabs.Tab value="contests">Contests</Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="overview" pt="lg">
                                <OverviewStats />
                            </Tabs.Panel>

                            <Tabs.Panel value="submissions" pt="lg">
                                <SubmissionStats />
                            </Tabs.Panel>

                            <Tabs.Panel value="contests" pt="lg">
                                <ContestStats />
                            </Tabs.Panel>
                        </Tabs>
                    </Grid.Col>
                </Grid>
            </Container>

            {/* Edit Profile Modal */}
            <EditModal
                editModalOpened={editModalOpened}
                setEditModalOpened={setEditModalOpened}
            />
        </Box>
    );
}
