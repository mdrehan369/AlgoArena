import { Problem } from "@repo/db"

type extendedProblem = Problem & {
    totalSubmissions: number;
    userStatus: "solved" | "attempted" | "not-attempted";
}

export const mockProblems: extendedProblem[] = [
    {
        id: 1,
        title: "Two Sum",
        description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
        slug: "two-sum",
        level: "STARTER",
        topics: ["ARRAY", "HASH_TABLE"],
        acceptanceRate: 85.2,
        totalSubmissions: 1250,
        userStatus: "solved",
        constraints: [],
        createdAt: new Date("2023-01-01T00:00:00Z"),
    },
    {
        id: 2,
        title: "Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating-characters",
        level: "APPRENTICE",
        topics: ["STRING", "SLIDING_WINDOW", "HASH_TABLE"],
        acceptanceRate: 67.8,
        totalSubmissions: 890,
        userStatus: "attempted",
        constraints: [],
        createdAt: new Date("2023-01-01T00:00:00Z"),
        description: "Given a string, find the length of the longest substring without repeating characters."
    },
    {
        id: 3,
        title: "Maximum Subarray",
        slug: "maximum-subarray",
        level: "APPRENTICE",
        topics: ["ARRAY", "DYNAMIC_PROGRAMMING"],
        acceptanceRate: 72.4,
        totalSubmissions: 1100,
        userStatus: "not-attempted",
        constraints: [],
        createdAt: new Date("2023-01-01T00:00:00Z"),
        description: "Find the contiguous subarray within an array (containing at least one number) which has the largest sum."
    },
    {
        id: 4,
        title: "Binary Tree Inorder Traversal",
        slug: "binary-tree-inorder-traversal",
        level: "CHALLENGER",
        topics: ["BINARY_TREE"],
        acceptanceRate: 58.9,
        totalSubmissions: 650,
        userStatus: "solved",
        constraints: [],
        createdAt: new Date("2023-01-01T00:00:00Z"),
        description: "Given a binary tree, return the inorder traversal of its nodes' values."
    },
    {
        id: 5,
        title: "Graph Valid Tree",
        slug: "graph-valid-tree",
        level: "EXPERT",
        topics: ["GRAPH"],
        acceptanceRate: 45.3,
        totalSubmissions: 420,
        userStatus: "not-attempted",
        constraints: [],
        createdAt: new Date("2023-01-01T00:00:00Z"),
        description: "Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), determine if these edges form a valid tree."
    },
    {
        id: 6,
        title: "Merge K Sorted Lists",
        slug: "merge-k-sorted-lists",
        level: "LEGENDARY",
        topics: ["ARRAY", "SORTING"],
        acceptanceRate: 32.1,
        totalSubmissions: 280,
        userStatus: "attempted",
        constraints: [],
        createdAt: new Date("2023-01-01T00:00:00Z"),
        description: "Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity."
    },
]
