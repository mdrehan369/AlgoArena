import SharedDefs from "./enums";

const ProblemSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    description: { type: "string" },
    slug: { type: "string" },
    constraints: {
      type: "array",
      items: { type: "string" },
    },
    topics: {
      type: "array",
      items: { ...SharedDefs.Topic },
    },
    level: { ...SharedDefs.Level },
    acceptanceRate: { type: "number" },
    createdAt: { ...SharedDefs.DateTime },
  },
  required: [
    "title",
    "description",
    "slug",
    "constraints",
    "topics",
    "level",
  ],
} as const;

export default ProblemSchema
