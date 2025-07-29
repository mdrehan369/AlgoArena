
export default function createResponseSchema<T>(ResponseDataType: T) {
    return {
        type: "object",
        required: [],
        properties: {
            success: { type: 'boolean', default: true },
            message: { type: 'string', default: 'ok' },
            data: { type: ResponseDataType }
        }
    }
}
