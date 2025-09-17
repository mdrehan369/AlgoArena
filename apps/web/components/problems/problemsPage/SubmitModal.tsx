'use client';

import { useSession } from '@lib/auth-client';
import {
    setIsSubmiting,
    startSubmitting,
} from '@lib/features/problemsPage/problemPage.slice';
import { useAppDispatch, useAppSelector } from '@lib/hooks';
import {
    Modal,
    Stack,
    Group,
    Text,
    Card,
    Badge,
    Box,
    Button,
    Transition,
} from '@mantine/core';
import {
    IconCheck,
    IconX,
    IconClock,
    IconMeteor,
    IconTrophy,
    IconLoader,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { SubmitProblemKeys } from '@utils/constants';
import { submitProblem } from 'queries/problems.queries';
import { useState, useEffect } from 'react';
import { Outputs } from 'types/TestCase.types';

type SubmissionState = 'running' | 'completed';

export default function SubmitModal() {
    const {
        language,
        problem,
        code,
        jobId,
        isSubmiting: opened,
        submitResults: { finalResult, testCases, isPending },
    } = useAppSelector((state) => state.problemPage);

    const [currentTestCase, setCurrentTestCase] = useState(0);
    const [compilationError, setCompilationError] = useState<string | null>(
        null,
    );

    const dispatch = useAppDispatch();
    const submit = useMutation({
        mutationFn: submitProblem,
        mutationKey: SubmitProblemKeys,
        onError(error) {
            console.log(error);
        },
        onSuccess(data) {
            console.log(data);
        },
    });

    const session = useSession();

    useEffect(() => {
        if (!opened) return;

        // Reset state when modal opens
        setCurrentTestCase(0);
        setCompilationError(null);
        dispatch(startSubmitting());

        submit.mutate({
            userId: session.data!.user.id,
            code,
            language,
            problemId: problem!.id,
            id: jobId,
        });
    }, [opened]);

    const getStateConfig = (state: SubmissionState) => {
        switch (state) {
            case 'running':
                return {
                    title: 'Running Test Cases',
                    description: `Executing test case ${currentTestCase + 1} of ${testCases.length}...`,
                    icon: <IconLoader size={24} />,
                    color: '#14b8a6',
                };

            case 'completed':
                return {
                    title: finalResult?.isAccepted
                        ? 'Accepted!'
                        : 'Not Accepted',
                    description: finalResult?.isAccepted
                        ? 'Congratulations! Your solution passed all test cases.'
                        : "Your solution didn't pass all test cases. Keep trying!",
                    icon: finalResult?.isAccepted ? (
                        <IconCheck size={24} />
                    ) : (
                        <IconX size={24} />
                    ),
                    color: finalResult?.isAccepted ? '#10b981' : '#ef4444',
                };
        }
    };

    const stateConfig = getStateConfig(isPending ? 'running' : 'completed');

    const getTestCaseIcon = (status: Outputs['status']) => {
        switch (status) {
            case 'PASS':
                return <IconCheck size={16} color="#10b981" />;
            case 'FAIL':
                return <IconX size={16} color="#ef4444" />;
            case 'TIME_LIMIT_EXCEEDED':
                return <IconClock size={16} color="#f59e0b" />;
            case 'MEMORY_LIMIT_EXCEEDED':
                return <IconMeteor size={16} color="#8b5cf6" />;
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={() => dispatch(setIsSubmiting(false))}
            title={
                <Group>
                    <Box style={{ color: stateConfig.color }}>
                        {stateConfig.icon}
                    </Box>
                    <Text fw={600} c="white">
                        Submitting Solution
                    </Text>
                </Group>
            }
            size="lg"
            centered
            closeOnClickOutside={false}
            withCloseButton={true}
            styles={{
                body: {
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                },
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
            <Stack gap="lg" p="md">
                {/* Problem Info */}
                <Card
                    padding="md"
                    style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.5)',
                        border: '1px solid #334155',
                    }}
                >
                    <Group justify="space-between">
                        <Stack gap="xs">
                            <Text c="white" fw={600}>
                                {problem?.title}
                            </Text>
                            <Badge variant="light" color="teal" size="sm">
                                {language}
                            </Badge>
                        </Stack>
                    </Group>
                </Card>

                {/* Current State */}
                <Card
                    padding="lg"
                    style={{
                        backgroundColor: `${stateConfig.color}15`,
                        border: `1px solid ${stateConfig.color}40`,
                    }}
                >
                    <Group>
                        <Box
                            style={{
                                color: stateConfig.color,
                                animation: submit.isPending
                                    ? 'pulse 2s infinite'
                                    : 'none',
                            }}
                        >
                            {stateConfig.icon}
                        </Box>
                        <Stack gap="xs">
                            <Text c="white" fw={600} size="lg">
                                {stateConfig.title}
                            </Text>
                            <Text c="gray.3" size="sm">
                                {stateConfig.description}
                            </Text>
                        </Stack>
                    </Group>
                </Card>

                {/* Test Cases */}
                <Card
                    padding="md"
                    style={{
                        backgroundColor: 'rgba(30, 41, 59, 0.5)',
                        border: '1px solid #475569',
                        height: '20vh',
                        scrollBehavior: 'smooth',
                        overflowY: 'scroll',
                    }}
                >
                    {compilationError ? (
                        <Card
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                padding: '6px',
                                border: '0px solid #ff545f',
                                color: '#ff545f',
                            }}
                        >
                            {compilationError}
                        </Card>
                    ) : (
                        <>
                            <Text c="white" fw={600} mb="md">
                                Test Cases
                            </Text>
                            <Stack gap="xs">
                                {testCases.map((testCase) => (
                                    <Transition
                                        key={testCase.testCase.id}
                                        mounted={true}
                                        transition="slide-right"
                                        duration={300}
                                        timingFunction="ease"
                                    >
                                        {(styles) => (
                                            <Group
                                                justify="space-between"
                                                p="sm"
                                                style={{
                                                    ...styles,
                                                    backgroundColor:
                                                        'rgba(15, 23, 42, 0.5)',
                                                    border: '1px solid #334155',
                                                    borderRadius: '6px',
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <Group gap="sm">
                                                    {getTestCaseIcon(
                                                        testCase.status,
                                                    )}
                                                    <Text c="white" size="sm">
                                                        Test Case{' '}
                                                        {testCase.testCase.id}
                                                    </Text>
                                                    {!submit.isPending &&
                                                        testCase.status !==
                                                            'FAIL' && (
                                                            <Badge
                                                                size="xs"
                                                                variant="light"
                                                                color={
                                                                    testCase.status ===
                                                                    'PASS'
                                                                        ? 'green'
                                                                        : 'red'
                                                                }
                                                            >
                                                                {testCase.status
                                                                    .replace(
                                                                        /_/g,
                                                                        ' ',
                                                                    )
                                                                    .toLowerCase()}
                                                            </Badge>
                                                        )}
                                                </Group>

                                                {testCase.runtime !==
                                                    undefined &&
                                                    testCase.memory !==
                                                        undefined && (
                                                        <Group gap="md">
                                                            <Group gap="xs">
                                                                <IconClock
                                                                    size={12}
                                                                    color="#6b7280"
                                                                />
                                                                <Text
                                                                    c="gray.4"
                                                                    size="xs"
                                                                >
                                                                    {testCase.runtime.toFixed(
                                                                        1,
                                                                    )}
                                                                    ms
                                                                </Text>
                                                            </Group>
                                                            <Group gap="xs">
                                                                <IconMeteor
                                                                    size={12}
                                                                    color="#6b7280"
                                                                />
                                                                <Text
                                                                    c="gray.4"
                                                                    size="xs"
                                                                >
                                                                    {testCase.memory.toFixed(
                                                                        1,
                                                                    )}
                                                                    MB
                                                                </Text>
                                                            </Group>
                                                        </Group>
                                                    )}
                                            </Group>
                                        )}
                                    </Transition>
                                ))}
                            </Stack>
                        </>
                    )}
                </Card>

                {/* Final Result */}
                {finalResult && (
                    <Transition
                        mounted={!submit.isPending}
                        transition="slide-up"
                        duration={500}
                    >
                        {(styles) => (
                            <Card
                                padding="lg"
                                style={{
                                    ...styles,
                                    backgroundColor: finalResult.isAccepted
                                        ? 'rgba(16, 185, 129, 0.1)'
                                        : 'rgba(239, 68, 68, 0.1)',
                                    border: finalResult.isAccepted
                                        ? '1px solid #10b981'
                                        : '1px solid #ef4444',
                                }}
                            >
                                <Stack gap="md">
                                    <Group justify="center">
                                        <Box
                                            style={{
                                                color: finalResult.isAccepted
                                                    ? '#10b981'
                                                    : '#ef4444',
                                                animation:
                                                    'bounce 1s ease-in-out',
                                            }}
                                        >
                                            {finalResult.isAccepted ? (
                                                <IconTrophy size={32} />
                                            ) : (
                                                <IconX size={32} />
                                            )}
                                        </Box>
                                    </Group>

                                    <Text
                                        c="white"
                                        fw={700}
                                        size="xl"
                                        ta="center"
                                    >
                                        {finalResult.isAccepted
                                            ? 'Solution Accepted!'
                                            : 'Solution Not Accepted'}
                                    </Text>

                                    <Group justify="center" gap="xl">
                                        <Stack align="center" gap="xs">
                                            <Text c="gray.4" size="sm">
                                                Test Cases
                                            </Text>
                                            <Text c="white" fw={600}>
                                                {finalResult.testCasesPassed}/
                                                {testCases.length}
                                            </Text>
                                        </Stack>
                                        <Stack align="center" gap="xs">
                                            <Text c="gray.4" size="sm">
                                                Runtime
                                            </Text>
                                            <Text c="white" fw={600}>
                                                {finalResult.runtime}ms
                                            </Text>
                                        </Stack>
                                        <Stack align="center" gap="xs">
                                            <Text c="gray.4" size="sm">
                                                Memory
                                            </Text>
                                            <Text c="white" fw={600}>
                                                {finalResult.memory.toFixed(2)}
                                                MB
                                            </Text>
                                        </Stack>
                                    </Group>

                                    {/* {finalResult.isAccepted && ( */}
                                    {/*   <> */}
                                    {/*     <Divider color="gray.7" /> */}
                                    {/*     <Text c="gray.3" size="sm" ta="center"> */}
                                    {/*       🎉 Your solution ranks #{finalResult} globally! */}
                                    {/*     </Text> */}
                                    {/*   </> */}
                                    {/* )} */}
                                </Stack>
                            </Card>
                        )}
                    </Transition>
                )}

                {/* Action Button */}
                {!submit.isPending && (
                    <Button
                        fullWidth
                        color="teal"
                        size="md"
                        onClick={() => dispatch(setIsSubmiting(false))}
                    >
                        {finalResult?.isAccepted
                            ? 'Continue Coding!'
                            : 'Try Again'}
                    </Button>
                )}
            </Stack>

            <style jsx>{`
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                @keyframes bounce {
                    0%,
                    20%,
                    53%,
                    80%,
                    100% {
                        transform: translateY(0);
                    }
                    40%,
                    43% {
                        transform: translateY(-10px);
                    }
                    70% {
                        transform: translateY(-5px);
                    }
                    90% {
                        transform: translateY(-2px);
                    }
                }
            `}</style>
        </Modal>
    );
}
