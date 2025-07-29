interface OAuthConfig {
    clientId: string;
    clientSecret: string
}

interface AuthConfig {
    betterAuthSecret: string;
    betterAuthUrl: string;
    googleOAuth: OAuthConfig;
    githubOAuth: OAuthConfig;
    facebookOAuth: OAuthConfig;
}

interface DatabaseConfig {
    url: string;
}

interface AppConfig {
    url?: string;
    environment?: 'development' | 'production' | 'test';
    authConfig: AuthConfig;
    databaseConfig: DatabaseConfig;
    backendUrl: string;
}

const envs = process.env

export const validateConfig = () => {

    const requiredEnvs = ['BETTER_AUTH_SECRET', 'BETTER_AUTH_URL', 'GITHUB_CLIENT_SECRET', 'GITHUB_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_CLIENT_ID', 'FACEBOOK_CLIENT_ID', 'FACEBOOK_CLIENT_SECRET', 'DATABASE_URL', 'BACKEND_URL']

    requiredEnvs.forEach((env) => {
        if(!Object.keys(envs).find(val => val == env)) throw new Error(`${env} environment variable is missing!`)
    })


}

export const appConfig: AppConfig = {
        url: envs.FRONTENT_URL || "http://localhost:3000",
        environment: envs.NODE_ENV || "development",
        authConfig: {
            betterAuthSecret: envs.BETTER_AUTH_SECRET!,
            betterAuthUrl: envs.BETTER_AUTH_URL!,
            googleOAuth: {
                clientId: envs.GOOGLE_CLIENT_ID!,
                clientSecret: envs.GOOGLE_CLIENT_SECRET!,
            },
            githubOAuth: {
                clientId: envs.GITHUB_CLIENT_ID!,
                clientSecret: envs.GITHUB_CLIENT_SECRET!,
            },
            facebookOAuth: {
                clientId: envs.FACEBOOK_CLIENT_ID!,
                clientSecret: envs.FACEBOOK_CLIENT_SECRET!,
            }
        },
        databaseConfig: {
            url: envs.DATABASE_URL!
        },
        backendUrl: envs.BACKEND_URL || "http://localhost:5000/api/v1"
    }

