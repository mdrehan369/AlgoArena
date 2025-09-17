import { createSlice } from '@reduxjs/toolkit';
import { CustomTestCase } from 'types/TestCase.types';
import { FullProblem } from 'types/problems.types';
import { Outputs } from 'types/TestCase.types';
import { getRandomInt } from '@utils/generateRandomInt';
import { SubmittedResult } from '@repo/db';

enum Language {
    C = 'C',
    CPP = 'CPP',
    JS = 'JS',
    PYTHON = 'PYTHON',
}

export interface ProblemState {
    jobId: string;
    problem: FullProblem | null;
    code: string;
    language: Language;
    isRunning: boolean;
    testResults: Outputs[];
    customTestCases: CustomTestCase[];
    compileError: string | null;
    isSubmiting: boolean;
    isCustomTestCasesRunning: boolean;
    submitResults: {
        testCases: Outputs[];
        finalResult: SubmittedResult | null;
        isPending: boolean;
    };
}

const initialState: ProblemState = {
    jobId: getRandomInt(1000, 10000).toString(),
    problem: null,
    code: '',
    language: Language.CPP,
    isRunning: false,
    testResults: [],
    customTestCases: [],
    compileError: null,
    isSubmiting: false,
    isCustomTestCasesRunning: false,
    submitResults: {
        finalResult: null,
        testCases: [],
        isPending: false,
    },
};

const problemsSlice = createSlice({
    name: 'problems',
    initialState,
    reducers: {
        setProblemStatement: (state, action: { payload: FullProblem }) => {
            state.problem = action.payload;
        },
        setCode: (state, action: { payload: string }) => {
            state.code = action.payload;
        },
        setLanguage: (state, action: { payload: Language }) => {
            state.language = action.payload;
        },
        startRunTest: (state) => {
            state.compileError = null;
            state.isRunning = true;
        },
        startCustomTest: (state) => {
            state.compileError = null;
            state.customTestCases = state.customTestCases.map((tc) => ({
                id: tc.id,
                input: tc.input,
            }));
            state.isCustomTestCasesRunning = true;
        },
        stopRunTest: (state) => {
            state.isRunning = false;
        },
        stopCustomTest: (state) => {
            state.isCustomTestCasesRunning = false;
        },
        setTestResults: (state, action: { payload: Outputs[] }) => {
            state.testResults = action.payload;
        },
        setCompileError: (state, action: { payload: string }) => {
            state.testResults = [];
            state.compileError = action.payload;
        },
        setIsSubmiting: (state, action: { payload: boolean }) => {
            state.isSubmiting = action.payload;
        },
        addCustomTestCase: (state, action: { payload: CustomTestCase }) => {
            if (!state.customTestCases.find((tc) => tc.id == action.payload.id))
                state.customTestCases.push(action.payload);
        },
        removeCustomeTestCase: (state, action: { payload: number }) => {
            state.customTestCases = state.customTestCases.filter(
                (tc) => tc.id != action.payload,
            );
        },
        setCustomTestCaseResults: (state, action: { payload: Outputs[] }) => {
            state.customTestCases = state.customTestCases.map((tc) => {
                const res = action.payload.find(
                    (val) => val.testCase.id == tc.id,
                );
                return {
                    ...tc,
                    ...res,
                };
            });
        },
        setFinalResult: (state, action: { payload: SubmittedResult }) => {
            state.submitResults.finalResult = action.payload;
        },
        setTestCases: (state, action: { payload: Outputs[] }) => {
            state.submitResults.testCases = action.payload;
        },
        startSubmitting: (state) => {
            state.submitResults.isPending = true;
        },
        stopSubmitting: (state) => {
            state.submitResults.isPending = false;
        },
    },
});

export const {
    setProblemStatement,
    setCode,
    setLanguage,
    startRunTest,
    stopRunTest,
    setTestResults,
    setCompileError,
    setIsSubmiting,
    addCustomTestCase,
    removeCustomeTestCase,
    startCustomTest,
    stopCustomTest,
    setCustomTestCaseResults,
    setFinalResult,
    setTestCases,
    startSubmitting,
    stopSubmitting,
} = problemsSlice.actions;
export default problemsSlice.reducer;
