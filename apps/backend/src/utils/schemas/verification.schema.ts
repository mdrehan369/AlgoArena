import { SharedDefs } from ".";

const VerificationSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        identifier: { type: "string" },
        value: { type: "string" },
        expiresAt: { ...SharedDefs.DateTime },
        createdAt: { ...SharedDefs.DateTime, nullable: true },
        updatedAt: { ...SharedDefs.DateTime, nullable: true },
    },
    required: ["id", "identifier", "value", "expiresAt"]
} as const;

export default VerificationSchema
