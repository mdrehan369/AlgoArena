import { FastifySchema } from "fastify";
import createResponseSchema from "@/utils/createResponseSchema.js";
import { TestCaseSchema } from "@/utils/schemas/index.js";

export const RunTestSchema: FastifySchema = {
  description: "Run code test schema",
  tags: ["Runner"],
  summary: "run your code to test against the public test cases",
  body: {
    type: 'object',
    required: ['code', 'language', 'problemId'],
    properties: {
      code: { type: 'string', description: "Code to run tests" },
      problemId: { type: 'string', description: "Problem that you are solving" },
      language: { type: 'string', enum: ['CPP', 'C', 'JS', 'PYTHON'], description: "Language to run code", default: "CPP" }
    }
  },
  response: {
    200: createResponseSchema({
      type: 'array',
      required: ['status', 'output', 'testCase'],
      properties: {
        status: { type: 'string', description: "Status of test cases", enum: ["PASS", "FAIL"], default: "PASS" },
        output: { type: 'string', description: "Output of test case either error or wrong answer" },
        testCase: { ...TestCaseSchema },
        runtime: { type: 'string', description: "The time taken by the code to ran" },
        memory: { type: 'string', description: "The memory taken by the code to ran" },
      }
    }),
    400: createResponseSchema({}),
    404: createResponseSchema({})
  }
}
