import { Problem, TestCase } from '@repo/db';

export type Outputs = {
    testCase: TestCase;
    output: string;
    status: 'PASS' | 'FAIL' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED';
    runtime: number;
    memory: number;
    console: string;
};

export interface CustomTestCase {
    id: number;
    input: string;
    output?: string;
    runtime?: number;
    memory?: number;
    console?: string;
}
