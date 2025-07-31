const sharedDefs = {
  DateTime: { type: "string", format: "date-time" },
  Language: {
    type: "string",
    enum: ["CPP", "C", "JS", "PYTHON"],
  },
  Level: {
    type: "string",
    enum: ["STARTER", "APPRENTICE", "CHALLENGER", "EXPERT", "LEGENDARY"],
  },
  Provider: {
    type: "string",
    enum: ["GOOGLE", "FACEBOOK", "GITHUB", "CREDENTIALS"],
  },
  Topic: {
    type: "string",
    enum: [
      "ARRAY", "STRING", "TWO_POINTERS", "SLIDING_WINDOW", "PREFIX_SUM",
      "BIT_MANIPULATION", "LINKED_LIST", "STACK", "QUEUE", "HASH_TABLE",
      "HEAP", "GRAPH", "BINARY_TREE", "BINARY_SEARCH_TREE", "TRIE",
      "SEGMENT_TREE", "FENWICK_TREE", "UNION_FIND", "DOUBLY_LINKED_LIST",
      "DEQUE", "RECURSION", "BACKTRACKING", "BINARY_SEARCH", "SORTING",
      "GREEDY", "DYNAMIC_PROGRAMMING", "NUMBER_THEORY", "BITWISE_OPERATIONS",
      "SUFFIX_ARRAY"
    ],
  },
} as const;

export default sharedDefs
