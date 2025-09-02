import createResponseSchema from "@/utils/createResponseSchema";
import { SubmittedResultSchema, TestCaseSchema } from "@/utils/schemas";
import { FastifySchema } from "fastify";

export const SubmitProblemSchema: FastifySchema = {
  description: "Submit problem for a user",
  tags: ["Problems"],
  summary: "List all problems",
  body: {
    type: 'object',
    required: ["problemId", "code", "language"],
    properties: {
      problemId: { type: 'string', description: 'Problem Id to run submission' },
      code: { type: 'string', description: 'Code to run' },
      language: { type: 'string', default: "CPP", description: "Language to run on" },
    }
  },
  response: {
    200: createResponseSchema({
      type: "object",
      required: ["outputs", "submission"],
      properties: {
        submission: { ...SubmittedResultSchema },
        outputs: {
          type: 'array',
          required: ['status', 'output', 'testCase'],
          properties: {
            status: { type: 'string', description: "Status of test cases", enum: ["PASS", "FAIL"], default: "PASS" },
            output: { type: 'string', description: "Output of test case either error or wrong answer" },
            testCase: { ...TestCaseSchema },
            runtime: { type: 'string', description: "The time taken by the code to ran" },
            memory: { type: 'string', description: "The memory taken by the code to ran" },
          }

        }
      }
    })
  }
}
