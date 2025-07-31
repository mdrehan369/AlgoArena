const schema = {
    type: 'object',
    required: [],
    properties: {
        PORT: {
            type: 'string',
            default: 5000
        },
        COOKIE: {
            type: 'string',
            default: 'supersecretcookiekey'
        },
        FRONTEND_URL: {
            type: 'string',
            default: 'http://localhost:3000'
        }
    }
}

export type EnvConfig = {
    PORT: number,
    COOKIE: string,
    FRONTEND_URL: string
}

export const envOptions = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: true
}
