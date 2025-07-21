const schema = {
    type: 'object',
    required: [],
    properties: {
        PORT: {
            type: 'string',
            default: 5000
        }
    }
}

export type EnvConfig = {
    PORT: number
}

export const envOptions = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: true
}
