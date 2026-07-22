'use client';

import { Container, Grid, Box } from '@mantine/core';
import { useEffect } from 'react';
import { FullProblem } from 'types/problems.types';

import ProblemHeader from './Header';
import { useAppDispatch, useAppSelector } from '@lib/hooks';

import {
    resetProblemStatement,
    setCompileError,
    setCustomTestCaseResults,
    setFinalResult,
    setJobId,
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

import { getRandomInt } from '@utils/generateRandomInt.ts';
import useSSE from 'hooks/useSSE.ts';

export default function ProblemPage({ problem }: { problem: FullProblem }) {
    const dispatch = useAppDispatch();

    const jobId = getRandomInt(1000, 9999).toString();

    useEffect(() => {
        dispatch(setProblemStatement(problem));
        dispatch(setJobId(jobId));

        return () => {
            dispatch(resetProblemStatement());
        };
    }, [dispatch, problem]);

    function onMessageHandler(event: MessageEvent) {
        try {
            const data = JSON.parse(event.data);

            console.log(`Received SSE event for job ${jobId}:`, data);

            if (data.error) {
                dispatch(setCompileError(data.error));
            }

            if (data.action === 'TEST') {
                dispatch(setTestResults(data.data || []));

                dispatch(stopRunTest());
            } else if (data.action === 'CUSTOM') {
                dispatch(setCustomTestCaseResults(data.data || []));

                dispatch(stopCustomTest());
            } else {
                const submissionState = data.data?.submission;

                const outputs = data.data?.outputs;

                dispatch(setFinalResult(submissionState));

                dispatch(setTestCases(outputs));

                dispatch(stopSubmitting());
            }
        } catch (error) {
            console.error('Failed to process SSE message:', error);
        }
    }

    useSSE(jobId, onMessageHandler);

    return (
        <Box
            style={{
                backgroundColor: '#0f172a',
                minHeight: '100vh',
            }}
        >
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
