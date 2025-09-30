import { auth } from '@lib/auth';
import { useSession } from '@lib/auth-client';
import {
    Button,
    FileInput,
    Group,
    Modal,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { secondaryColors } from '@utils/colors';
import { UpdateProfileKeys, UpdateProfilePicture } from '@utils/constants';
import { formatDate } from '@utils/dateUtils';
import axios from 'axios';
import api from 'config/axios.config';
import { updateProfile, updateProfilePicture } from 'queries/profile.queries';
import { Dispatch, SetStateAction } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    profilePicture?: File;
    bio: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    x: string;
};

const fieldStyles = {
    label: { color: 'white' },
    input: {
        backgroundColor: secondaryColors.GRAY,
        border: '0px',
        color: 'white',
    },
};

export default function EditModal({
    editModalOpened,
    setEditModalOpened,
}: {
    editModalOpened: boolean;
    setEditModalOpened: Dispatch<SetStateAction<boolean>>;
}) {
    const update = useMutation({
        mutationKey: UpdateProfileKeys,
        mutationFn: updateProfile,
        onSuccess: () => {
            setEditModalOpened(false);
            // window.location.reload()
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const updatePicture = useMutation({
        mutationKey: UpdateProfilePicture,
        mutationFn: updateProfilePicture,
        onError: (err) => {
            console.log(err);
        },
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (data.profilePicture) {
                const formData = new FormData();
                formData.append('file', data.profilePicture);

                // const response = await api.put("/profile/picture", formData, {
                //   headers: {
                //     'Content-Type': 'multipart/form-data',
                //   }
                // })
                await updatePicture.mutateAsync(formData);
                // console.log('Picture upload response:', response)
            }

            // Update other profile fields
            const { profilePicture, ...profileData } = data;
            update.mutate(profileData);
        } catch (err) {
            console.error('Error uploading profile:', err);
        }
    };
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
                    body: {
                        backgroundColor: secondaryColors.DARK,
                        border: '0px',
                    },
                    header: {
                        backgroundColor: secondaryColors.DARKER,
                        borderBottom: '0px solid #334155',
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap="md" p="md">
                        <Controller
                            name="profilePicture"
                            control={control}
                            render={({ field }) => (
                                <FileInput
                                    label="Upload profile picture"
                                    placeholder="Choose a file"
                                    accept="image/*"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    styles={fieldStyles}
                                />
                            )}
                        />

                        <TextInput
                            label="Bio"
                            {...register('bio')}
                            defaultValue={user.bio?.toString()}
                            placeholder="For Ex. Part time programmer full time cricketer"
                            styles={fieldStyles}
                        />

                        <TextInput
                            label="Location"
                            {...register('location')}
                            defaultValue={user.location?.toString()}
                            placeholder="For Ex. Kolkata"
                            styles={fieldStyles}
                        />

                        <TextInput
                            label="Website"
                            defaultValue={user.website?.toString()}
                            placeholder="For Ex. https://johndoe.me"
                            {...register('website')}
                            styles={fieldStyles}
                        />

                        <TextInput
                            label="X URL"
                            {...register('x')}
                            defaultValue={user.x?.toString()}
                            placeholder="For Ex. https://x.com/johndoe"
                            styles={fieldStyles}
                        />

                        <TextInput
                            label="GitHub URL"
                            {...register('github')}
                            defaultValue={user.github?.toString()}
                            placeholder="For Ex. https://github.com/johndoe"
                            styles={fieldStyles}
                        />

                        <TextInput
                            label="LinkedIn Username URL"
                            defaultValue={user.linkedin?.toString()}
                            placeholder="For Ex. https://linkedin.com/johndoe"
                            {...register('linkedin')}
                            styles={fieldStyles}
                        />

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
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Save Changes
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
        )
    );
}
