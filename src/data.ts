import { Level, Topic } from "@prisma/client"

interface ProblemStatement {
    id: number
    title: string
    description: string
    level: Level
    exampleTestCases: Array<{
        input: string
        output: string
        description: string
    }>
    topics: Topic[]
    driverCode: string
}

export const problemStatements: ProblemStatement[] = [
    {
        id: 1,
        title: "Two Sum",
        description:
            '## Problem Statement\nGiven an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\n### Example\n#### Input:\n```json\n{"nums": [2, 7, 11, 15], "target": 9}\n```\n#### Output:\n```json\n[0, 1]\n```\n',
        level: Level.EASY,
        exampleTestCases: [
            {
                input: '{"nums": [2, 7, 11, 15], "target": 9}',
                output: "[0, 1]",
                description: "The numbers at indices 0 and 1 add up to 9."
            }
        ],
        topics: [Topic.ARRAY],
        driverCode: ""
    },
    {
        id: 2,
        title: "Palindrome Number",
        description:
            '## Problem Statement\nGiven an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\n### Example\n#### Input:\n```json\n{"x": 121}\n```\n#### Output:\n```json\ntrue\n```\n',
        level: Level.MEDIUM,
        exampleTestCases: [
            {
                input: '{"x": 121}',
                output: "true",
                description: "121 reads the same forward and backward."
            }
        ],
        topics: [Topic.STRING, Topic.TWO_POINTERS],
        driverCode: ""
    },
    {
        id: 3,
        title: "Merge Two Sorted Lists",
        description:
            '## Problem Statement\nYou are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list.\n\n### Example\n#### Input:\n```json\n{"list1": [1, 2, 4], "list2": [1, 3, 4]}\n```\n#### Output:\n```json\n[1, 1, 2, 3, 4, 4]\n```\n',
        level: Level.HARD,
        exampleTestCases: [
            {
                input: '{"list1": [1, 2, 4], "list2": [1, 3, 4]}',
                output: "[1, 1, 2, 3, 4, 4]",
                description: "Both lists are merged into a single sorted list."
            }
        ],
        driverCode: "",
        topics: [Topic.SORTING, Topic.RECURSION, Topic.ARRAY]
    },
    {
        id: 4,
        title: "Valid Parentheses",
        description:
            '## Problem Statement\nGiven a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\n### Example\n#### Input:\n```json\n{"s": "()[]{}"}\n```\n#### Output:\n```json\ntrue\n```\n',
        level: Level.MEDIUM,
        exampleTestCases: [
            {
                input: '{"s": "()[]{}"}',
                output: "true",
                description: "The string contains valid pairs of brackets."
            }
        ],
        driverCode: "",
        topics: [Topic.STRING, Topic.STACK]
    },
    {
        id: 5,
        title: "Best Time to Buy and Sell Stock",
        description:
            '## Problem Statement\nYou are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\nFind the maximum profit you can achieve from this transaction. If no profit can be made, return 0.\n\n### Example\n#### Input:\n```json\n{"prices": [7,1,5,3,6,4]}\n```\n#### Output:\n```json\n5\n```\n',
        level: Level.HARD,
        exampleTestCases: [
            {
                input: '{"prices": [7,1,5,3,6,4]}',
                output: "5",
                description:
                    "Buy on day 2 (price=1) and sell on day 5 (price=6) for a profit of 5."
            }
        ],
        driverCode: "",
        topics: [Topic.ARRAY, Topic.NUMBER_THEORY]
    }
]
