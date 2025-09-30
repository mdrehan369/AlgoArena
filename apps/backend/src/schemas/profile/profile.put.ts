import { FastifySchema } from "fastify";

export const ProfileUpdateSchema: FastifySchema = {
  description: "Request to Update the user profile",
  tags: ["Profile"],
  summary: "Request to Update the user profile",
  body: {
    type: "object",
    required: [],
    properties: {
      bio: { type: "string", description: "bio of the user" },
      location: { type: "string", description: "location of the user" },
      website: { type: "string", description: "website of the user" },
      github: { type: "string", description: "github url of the user" },
      linkedIn: { type: "string", description: "linkedin url of the user" },
      x: { type: "string", description: "x url of the user" },
    },
  },
};
