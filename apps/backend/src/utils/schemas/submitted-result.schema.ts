import { SharedDefs } from ".";

const SubmittedResultSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        problemId: { type: "integer" },
        userId: { type: "string" },
        code: { type: "string" },
        isAccepted: { type: "boolean", default: false },
        language: { ...SharedDefs.Language },
        runtime: { type: "number" },
        testCasesPassed: { type: "integer" },
        createdAt: { ...SharedDefs.DateTime },
    },
    required: ["problemId", "userId", "code", "language", "runtime"],
} as const;

export default SubmittedResultSchema
