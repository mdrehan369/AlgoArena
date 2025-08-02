import { SharedDefs } from "./index.js";

const UserSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        emailVerified: { type: "boolean" },
        image: { type: "string", nullable: true },
        createdAt: { ...SharedDefs.DateTime },
        updatedAt: { ...SharedDefs.DateTime },
    },
    required: ["id", "name", "email", "emailVerified", "createdAt", "updatedAt"],
} as const;

export default UserSchema
