import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { additionalFieldProps, type auth } from './auth';

export const authClient = createAuthClient({
    baseURL: 'http://localhost:3000',
    plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, useSession, signOut, getSession } =
    createAuthClient();
