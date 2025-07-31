const TestCaseSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        problemId: { type: "integer" },
        input: { type: "string" },
        output: { type: "string" },
        hidden: { type: "boolean", default: false },
    },
    required: ["problemId", "input", "output"],
} as const;

export default TestCaseSchema
