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
        }
    }
}

export type EnvConfig = {
    PORT: number,
    COOKIE: string
}

export const envOptions = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: true
}
