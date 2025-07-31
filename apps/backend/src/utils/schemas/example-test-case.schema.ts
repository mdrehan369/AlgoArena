const ExampleTestCasesSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        problemId: { type: "integer" },
        input: { type: "string" },
        output: { type: "string" },
        description: { type: "string" },
    },
    required: ["problemId", "input", "output", "description"],
} as const;

export default ExampleTestCasesSchema
