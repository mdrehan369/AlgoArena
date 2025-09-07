import { CustomTestCase, Language, Problem } from '@repo/db';
import api from 'config/axios.config';

export const runTest = async (data: {
    code: string;
    language: Language;
    problemId: Problem['id'];
}) => {
    try {
        const response = await api.post('/runner/test', data);
        return response.data;
    } catch (error) {
        console.log('Some error occured while running test', error);
        return null;
    }
};

export const runCustomTest = async (data: {
    code: string;
    language: Language;
    problemId: Problem['id'];
    customTestCases: CustomTestCase[];
}) => {
    try {
        console.log(data);
        const response = await api.post('/runner/custom', data);
        return response.data;
    } catch (error) {
        console.log('Some error occured while running test', error);
        return null;
    }
};
