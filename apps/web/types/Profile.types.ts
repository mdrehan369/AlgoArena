import { Language, Level, Topic } from '@repo/db';

export type QuickStats = {
    problemsSolved: number;
    getCurrStreak: number;
};

export type OverviewStats = {
    problemsSolved: number;
    acceptanceRate: number;
    totalSubmissions: number;
    recentActivity: Record<string, number>;
    problemsSolvedByDifficulty: Record<Level, number>;
    problemsSolvedByLanguages: Record<Language, number>;
    problemsSolvedByTopics: Record<Topic, number>;
};
