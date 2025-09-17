'use client';

import { Container, Grid, Box } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { FullProblem } from 'types/problems.types';
import ProblemHeader from './Header';
import { useAppDispatch, useAppSelector } from '@lib/hooks';
import {
    setCompileError,
    setCustomTestCaseResults,
    setFinalResult,
    setProblemStatement,
    setTestCases,
    setTestResults,
    stopCustomTest,
    stopRunTest,
    stopSubmitting,
} from '@lib/features/problemsPage/problemPage.slice';
import LeftPane from './LeftPane.tsx';
import RightPane from './RightPane.tsx';
import SubmitModal from './SubmitModal.tsx';
import { clientConfig } from 'config/client.config.ts';

export default function ProblemPage({ problem }: { problem: FullProblem }) {
    const dispatch = useAppDispatch();
    const eventSourceRef = useRef<EventSource | null>(null);
    const jobId = useAppSelector((state) => state.problemPage.jobId);

    useEffect(() => {
        dispatch(setProblemStatement(problem));
        if (!eventSourceRef.current) {
            const eventSource = new EventSource(
                `${clientConfig.backendUrl}/runner/events/${jobId}`,
            );
            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Received:', data);

                if (data.error) dispatch(setCompileError(data.error));

                if (data.action == 'TEST') {
                    dispatch(setTestResults(data.data || []));
                    dispatch(stopRunTest());
                } else if (data.action == 'CUSTOM') {
                    dispatch(setCustomTestCaseResults(data.data || []));
                    dispatch(stopCustomTest());
                } else {
                    const submissionState = data.data.submission;
                    const outputs = data.data.outputs;
                    dispatch(setFinalResult(submissionState));
                    dispatch(setTestCases(outputs));
                    dispatch(stopSubmitting());
                }
            };
            eventSourceRef.current = eventSource;
        }

        return () => {
            eventSourceRef.current?.close();
        };
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
