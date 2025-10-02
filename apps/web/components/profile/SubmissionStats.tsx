import CustomLoader from '@components/Loader';
import {
    Anchor,
    Badge,
    Box,
    Button,
    Card,
    Group,
    Table,
    Text,
    Title,
} from '@mantine/core';
import { SubmissionStatus } from '@repo/db';
import {
    IconCheck,
    IconChevronRight,
    IconClock,
    IconMinus,
    IconTarget,
    IconX,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { RecentSubmissionsStatsKeys } from '@utils/constants';
import { formatDateTime } from '@utils/dateUtils';
import Link from 'next/link';
import { getRecentSubmissions } from 'queries/profile.queries';
import { SubmissionWithProblemProfile } from 'types/Submission.types';

export default function SubmissionStats() {
    const { data, isLoading } = useQuery<SubmissionWithProblemProfile[]>({
        queryKey: RecentSubmissionsStatsKeys,
        queryFn: getRecentSubmissions,
    });

    const getStatusIcon = (status: SubmissionStatus) => {
        switch (status) {
            case 'ACCEPTED':
                return <IconCheck size={16} color="#10b981" />;
            case 'WRONG_ANSWER':
                return <IconX size={16} color="#ef4444" />;
            case 'TIME_LIMIT_EXCEEDED':
                return <IconClock size={16} color="#f59e0b" />;
            case 'MEMORY_LIMIT_EXCEEDED':
                return <IconTarget size={16} color="#8b5cf6" />;
            default:
                return <IconMinus size={16} color="#6b7280" />;
        }
    };
    return !isLoading ? (
        data && (
            <Card
                padding={0}
                style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #475569',
                }}
            >
                <Box p="lg" style={{ borderBottom: '1px solid #475569' }}>
                    <Group justify="space-between">
                        <Title order={3} c="white">
                            Recent Submissions
                        </Title>
                        <Button
                            variant="subtle"
                            color="teal"
                            rightSection={<IconChevronRight size={16} />}
                        >
                            View All
                        </Button>
                    </Group>
                </Box>

                <Table
                    highlightOnHover
                    styles={{
                        table: { backgroundColor: 'transparent' },
                        th: {
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                            color: 'white',
                            borderBottom: '1px solid #475569',
                            padding: '16px',
                        },
                        td: {
                            borderBottom: '1px solid #374151',
                            padding: '16px',
                        },
                        tr: {
                            '&:hover': {
                                backgroundColor: 'rgba(20, 184, 166, 0.05)',
                            },
                        },
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Problem</Table.Th>
                            <Table.Th>Language</Table.Th>
                            <Table.Th>Runtime</Table.Th>
                            <Table.Th>Memory</Table.Th>
                            <Table.Th>Submitted</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.map((submission) => (
                            <Table.Tr key={submission.id}>
                                <Table.Td>
                                    <Group gap="xs">
                                        {getStatusIcon(submission.status)}
                                        <Badge
                                            size="xs"
                                            variant="light"
                                            color={
                                                submission.status === 'ACCEPTED'
                                                    ? 'green'
                                                    : 'red'
                                            }
                                        >
                                            {submission.status.replace(
                                                /_/g,
                                                ' ',
                                            )}
                                        </Badge>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Anchor
                                        component={Link}
                                        href={`/problems/${submission.problem.slug}`}
                                        c="white"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Text fw={500}>
                                            {submission.problem.title}
                                        </Text>
                                    </Anchor>
                                </Table.Td>
                                <Table.Td>
                                    <Badge
                                        variant="outline"
                                        color="gray"
                                        size="sm"
                                    >
                                        {submission.language}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Text c="gray.3" size="sm">
                                        {submission.runtime}ms
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text c="gray.3" size="sm">
                                        {submission.memory}MB
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text c="gray.3" size="sm">
                                        {formatDateTime(
                                            submission.createdAt.toString(),
                                        )}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        )
    ) : (
        <CustomLoader />
    );
}
