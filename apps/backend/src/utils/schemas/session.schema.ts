import { SharedDefs } from "./index.js";

const SessionSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        expiresAt: { $ref: "#/$defs/DateTime" },
        token: { type: "string" },
        createdAt: { ...SharedDefs.DateTime },
        updatedAt: { ...SharedDefs.DateTime },
        ipAddress: { type: "string", nullable: true },
        userAgent: { type: "string", nullable: true },
        userId: { type: "string" }
    },
    required: ["id", "expiresAt", "token", "createdAt", "updatedAt", "userId"],
} as const;

export default SessionSchema
