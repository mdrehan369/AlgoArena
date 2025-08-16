export default function createErrorResponseSchema(status: number, message: string, data?: Record<string, any>) {
  return {
    type: "object",
    required: [],
    properties: {
      success: { type: 'boolean', default: true },
      message: { type: 'string', default: 'ok' },
    }
  }
}
