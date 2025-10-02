import createResponseSchema from "@/utils/createResponseSchema";
import { SubmittedResultSchema } from "@/utils/schemas";
import { FastifySchema } from "fastify";

export const GetQuickStatsSchema: FastifySchema = {
  description: "Get quick stats of a user",
  tags: ["Profile", "Quick"],
  summary: "Get quick stats like current streak and total problems solved",
  response: {
    200: createResponseSchema({
      type: "object",
      required: [],
      properties: {
        problemsSolved: {
          type: "number",
          description: "Total Problems Solved",
        },
        getCurrStreak: { type: "number", description: "Current Streak" },
      },
    }),
  },
};

export const GetRecentSubmissionStatsSchema: FastifySchema = {
  description: "Get quick stats of a user",
  tags: ["Profile", "Recent"],
  summary: "Get recent submissions",
  // response: {
  //   200: createResponseSchema({
  //     type: "array",
  //     items: { ...SubmittedResultSchema }
  //   }),
  // },
};

export const GetOverviewStatsSchema: FastifySchema = {
  description: "Get overview stats of a user",
  tags: ["Profile", "Overview"],
  summary:
    "Get overview stats like problems solved by difficulty and problems solved by topics and all",
  response: {
    200: createResponseSchema({
      type: "object",
      required: [],
      properties: {
        problemsSolved: {
          type: "number",
          description: "Total Problems Solved",
        },
        acceptanceRate: {
          type: "number",
          description: "Total Problems Solved",
        },
        totalSubmissions: { type: "number", description: "Current Streak" },
        problemsSolvedByDifficulty: {
          type: "object",
          required: [
            "STARTER",
            "APPRENTICE",
            "CHALLENGER",
            "EXPERT",
            "LEGENDARY",
          ],
          properties: {
            STARTER: {
              type: "number",
              description: "Total Starter Problems Solved",
            },
            APPRENTICE: {
              type: "number",
              description: "Total Apprentice Problems Solved",
            },
            CHALLENGER: {
              type: "number",
              description: "Total Challenger Problems Solved",
            },
            EXPERT: {
              type: "number",
              description: "Total Expert Problems Solved",
            },
            LEGENDARY: {
              type: "number",
              description: "Total Legendary Problems Solved",
            },
          },
        },
        problemsSolvedByLanguages: {
          type: "object",
          required: ["CPP", "C", "JS", "PYTHON"],
          properties: {
            CPP: {
              type: "number",
              description: "Total Problems Solved By CPP",
            },
            C: { type: "number", description: "Total Problems Solved By C" },
            JS: { type: "number", description: "Total Problems Solved By Js" },
            PYTHON: {
              type: "number",
              description: "Total Problems Solved By Python",
            },
          },
        },
        recentActivity: {},
        problemsSolvedByTopics: {
          type: "object",
          required: [],
          properties: {
            ARRAY: {
              type: "number",
              description: "Total Problems Solved By ARRAY",
            },
            STRING: {
              type: "number",
              description: "Total Problems Solved By STRING",
            },
            TWO_POINTERS: {
              type: "number",
              description: "Total Problems Solved By TWO_POINTERS",
            },
            SLIDING_WINDOW: {
              type: "number",
              description: "Total Problems Solved By SLIDING_WINDOW",
            },
            PREFIX_SUM: {
              type: "number",
              description: "Total Problems Solved By PREFIX_SUM",
            },
            BIT_MANIPULATION: {
              type: "number",
              description: "Total Problems Solved By BIT_MANIPULATION",
            },
            LINKED_LIST: {
              type: "number",
              description: "Total Problems Solved By LINKED_LIST",
            },
            STACK: {
              type: "number",
              description: "Total Problems Solved By STACK",
            },
            QUEUE: {
              type: "number",
              description: "Total Problems Solved By QUEUE",
            },
            HASH_TABLE: {
              type: "number",
              description: "Total Problems Solved By HASH_TABLE",
            },
            HEAP: {
              type: "number",
              description: "Total Problems Solved By HEAP",
            },
            GRAPH: {
              type: "number",
              description: "Total Problems Solved By GRAPH",
            },
            BINARY_TREE: {
              type: "number",
              description: "Total Problems Solved By BINARY_TREE",
            },
            BINARY_SEARCH_TREE: {
              type: "number",
              description: "Total Problems Solved By BINARY_SEARCH_TREE",
            },
            TRIE: {
              type: "number",
              description: "Total Problems Solved By TRIE",
            },
            SEGMENT_TREE: {
              type: "number",
              description: "Total Problems Solved By SEGMENT_TREE",
            },
            FENWICK_TREE: {
              type: "number",
              description: "Total Problems Solved By FENWICK_TREE",
            },
            UNION_FIND: {
              type: "number",
              description: "Total Problems Solved By UNION_FIND",
            },
            DOUBLY_LINKED_LIST: {
              type: "number",
              description: "Total Problems Solved By DOUBLY_LINKED_LIST",
            },
            DEQUE: {
              type: "number",
              description: "Total Problems Solved By DEQUE",
            },
            RECURSION: {
              type: "number",
              description: "Total Problems Solved By RECURSION",
            },
            BACKTRACKING: {
              type: "number",
              description: "Total Problems Solved By BACKTRACKING",
            },
            BINARY_SEARCH: {
              type: "number",
              description: "Total Problems Solved By BINARY_SEARCH",
            },
            SORTING: {
              type: "number",
              description: "Total Problems Solved By SORTING",
            },
            GREEDY: {
              type: "number",
              description: "Total Problems Solved By GREEDY",
            },
            DYNAMIC_PROGRAMMING: {
              type: "number",
              description: "Total Problems Solved By DYNAMIC_PROGRAMMING",
            },
            NUMBER_THEORY: {
              type: "number",
              description: "Total Problems Solved By NUMBER_THEORY",
            },
            BITWISE_OPERATIONS: {
              type: "number",
              description: "Total Problems Solved By BITWISE_OPERATIONS",
            },
            SUFFIX_ARRAY: {
              type: "number",
              description: "Total Problems Solved By SUFFIX_ARRAY",
            },
          },
        },
      },
    }),
  },
};
