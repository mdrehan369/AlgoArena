'use client';

import { Container, Grid, Box } from '@mantine/core';
import { useEffect } from 'react';
import { FullProblem } from 'types/problems.types';
import ProblemHeader from './Header';
import { useAppDispatch } from '@lib/hooks';
import { setProblemStatement } from '@lib/features/problemsPage/problemPage.slice';
import LeftPane from './LeftPane.tsx';
import RightPane from './RightPane.tsx';
import SubmitModal from './SubmitModal.tsx';

export default function ProblemPage({ problem }: { problem: FullProblem }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setProblemStatement(problem));
    }, []);

    return (
        <Box style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
            <ProblemHeader />
            <Container fluid py="md" px="xl">
                <Grid>
                    <LeftPane />
                    <RightPane />
                </Grid>
            </Container>
            <SubmitModal />
        </Box>
    );
}
