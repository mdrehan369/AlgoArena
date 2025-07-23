import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@repo/db";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string, // eslint-disable-line turbo/no-undeclared-env-vars
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, // eslint-disable-line turbo/no-undeclared-env-vars
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string, // eslint-disable-line turbo/no-undeclared-env-vars
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // eslint-disable-line turbo/no-undeclared-env-vars
        },
        facebook: {
            clientId: process.env.FACEBOOK_CLIENT_ID as string, // eslint-disable-line turbo/no-undeclared-env-vars
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, // eslint-disable-line turbo/no-undeclared-env-vars
        }
    }
});
