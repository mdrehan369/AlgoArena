import SharedDefs from "./enums.js";

const DriverCodeSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    language: { ...SharedDefs.Language },
    beforeCode: { type: "string" },
    placeHolderCode: { type: "string" },
    afterCode: { type: "string" },
    problemId: { type: "integer" },
  },
  required: ["language", "beforeCode", "afterCode", "problemId"],
} as const;

export default DriverCodeSchema
