import { SharedDefs } from ".";

const AccountSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        accountId: { type: "string" },
        providerId: { type: "string" },
        userId: { type: "string" },
        accessToken: { type: "string", nullable: true },
        refreshToken: { type: "string", nullable: true },
        idToken: { type: "string", nullable: true },
        accessTokenExpiresAt: { ...SharedDefs.DateTime, nullable: true },
        refreshTokenExpiresAt: { ...SharedDefs.DateTime, nullable: true },
        scope: { type: "string", nullable: true },
        password: { type: "string", nullable: true },
        createdAt: { ...SharedDefs.DateTime },
        updatedAt: { ...SharedDefs.DateTime },
    },
    required: [
        "id", "accountId", "providerId", "userId",
        "createdAt", "updatedAt"
    ]
} as const;

export default AccountSchema
