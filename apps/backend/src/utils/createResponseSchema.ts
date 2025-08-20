
export default function createResponseSchema(ResponseDataSchema: Record<string, any>) {
  return {
    type: "object",
    required: [],
    properties: {
      success: { type: 'boolean', default: true },
      message: { type: 'string', default: 'ok' },
      data: { ...ResponseDataSchema },
      error: { type: 'string' }
    }
  }
}

