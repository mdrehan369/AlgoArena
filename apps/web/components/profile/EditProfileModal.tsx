import { auth } from '@lib/auth';
import { useSession } from '@lib/auth-client';
import {
    Button,
    FileInput,
    Group,
    Modal,
    Stack,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

export default function EditModal({
    editModalOpened,
    setEditModalOpened,
}: {
    editModalOpened: boolean;
    setEditModalOpened: Dispatch<SetStateAction<boolean>>;
}) {
    const session = useSession();
    const user = session.data?.user as typeof auth.$Infer.Session.user;

    return (
        user && (
            <Modal
                opened={editModalOpened}
                onClose={() => setEditModalOpened(false)}
                title={
                    <Text fw={600} c="white">
                        Edit Profile
                    </Text>
                }
                size="lg"
                centered
                styles={{
                    // modal: {
                    //   backgroundColor: "#1e293b",
                    //   border: "1px solid #475569",
                    // },
                    header: {
                        backgroundColor: '#0f172a',
                        borderBottom: '1px solid #334155',
                    },
                    title: {
                        color: 'white',
                    },
                    close: {
                        color: '#94a3b8',
                        '&:hover': {
                            backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        },
                    },
                }}
            >
                <Stack gap="md" p="md">
                    <FileInput
                        label="Profile Picture"
                        placeholder="Upload new profile picture"
                        accept="image/*"
                        styles={{
                            label: { color: 'white' },
                            input: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                color: 'white',
                            },
                        }}
                    />

                    <TextInput
                        label="Full Name"
                        defaultValue={user.name}
                        styles={{
                            label: { color: 'white' },
                            input: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                color: 'white',
                            },
                        }}
                    />

                    <Textarea
                        label="Bio"
                        defaultValue={user.bio?.toString()}
                        minRows={3}
                        styles={{
                            label: { color: 'white' },
                            input: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                color: 'white',
                            },
                        }}
                    />

                    <TextInput
                        label="Location"
                        defaultValue={user.location?.toString()}
                        styles={{
                            label: { color: 'white' },
                            input: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                color: 'white',
                            },
                        }}
                    />

                    <TextInput
                        label="Website"
                        defaultValue={user.website?.toString()}
                        styles={{
                            label: { color: 'white' },
                            input: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                color: 'white',
                            },
                        }}
                    />

                    <Group grow>
                        <TextInput
                            label="GitHub Username"
                            defaultValue={user.github?.toString()}
                            styles={{
                                label: { color: 'white' },
                                input: {
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #475569',
                                    color: 'white',
                                },
                            }}
                        />

                        <TextInput
                            label="LinkedIn Username"
                            defaultValue={user.linkedin?.toString()}
                            styles={{
                                label: { color: 'white' },
                                input: {
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #475569',
                                    color: 'white',
                                },
                            }}
                        />
                    </Group>

                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="outline"
                            color="gray"
                            onClick={() => setEditModalOpened(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="teal"
                            onClick={() => setEditModalOpened(false)}
                        >
                            Save Changes
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        )
    );
}
