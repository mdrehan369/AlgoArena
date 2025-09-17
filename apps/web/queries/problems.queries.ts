import api from 'config/axios.config';
import { Language, Level, Problem, Topic } from '@repo/db';

export const getProblems = async (params: {
    page?: number;
    limit?: number;
    status?: 'solved' | 'attempted' | 'not-attempted';
    level?: Level;
    topics?: Topic[];
    search?: string;
}) => {
    try {
        const response = await api.get('/problems', { params });
        return response.data.data;
    } catch (error) {
        console.log('Error while fetching problems', error);
        return null;
    }
};

export const submitProblem = async (body: {
    userId: string;
    id: string;
    code: string;
    language: Language;
    problemId: Problem['id'];
}) => {
    try {
        const response = await api.post('/problems/problem/submit', body);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
