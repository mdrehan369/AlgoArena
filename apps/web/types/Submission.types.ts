import { Prisma } from '@repo/db';

export type SubmissionWithProblemProfile = Prisma.SubmittedResultGetPayload<{
    omit: {
        code: true;
        userId: true;
        testCasesPassed: true;
    };
    include: {
        problem: {
            select: {
                slug: true;
                title: true;
            };
        };
    };
}>;
