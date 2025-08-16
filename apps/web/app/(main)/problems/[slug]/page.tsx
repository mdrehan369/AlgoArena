"use client"

import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
  Tabs,
  Select,
  Textarea,
  Badge,
  Divider,
  Code,
  ScrollArea,
  ActionIcon,
  Tooltip,
  Alert,
} from "@mantine/core"
import {
  IconPray,
  IconSend,
  IconArrowLeft,
  IconBookmark,
  IconShare,
  IconThumbUp,
  IconThumbDown,
  IconClock,
  IconMeteor,
  IconCheck,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

// Types based on your Prisma schema
type Language = "CPP" | "C" | "JS" | "PYTHON"
type Level = "STARTER" | "APPRENTICE" | "CHALLENGER" | "EXPERT" | "LEGENDARY"

interface Problem {
  id: number
  title: string
  description: string
  level: Level
  topics: string[]
  constraints: string[]
  exampleTestCases: {
    input: string
    output: string
    description: string
  }[]
  driverCodes: {
    language: Language
    beforeCode: string
    afterCode: string
  }[]
}

interface TestResult {
  input: string
  expectedOutput: string
  actualOutput: string
  passed: boolean
  runtime: number
  memory: number
}

// Mock problem data based on your schema
const mockProblem: Problem = {
  id: 1,
  title: "Two Sum",
  level: "STARTER",
  topics: ["ARRAY", "HASH_TABLE"],
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists.",
  ],
  exampleTestCases: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      description: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      description: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      description: "Because nums[0] + nums[1] == 6, we return [0, 1].",
    },
  ],
  driverCodes: [
    {
      language: "CPP",
      beforeCode: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
`,
      afterCode: `    }
};`,
    },
    {
      language: "PYTHON",
      beforeCode: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
`,
      afterCode: `        pass`,
    },
    {
      language: "JS",
      beforeCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
`,
      afterCode: `};`,
    },
  ],
}

const levelColors = {
  STARTER: "green",
  APPRENTICE: "blue",
  CHALLENGER: "yellow",
  EXPERT: "orange",
  LEGENDARY: "red",
}

const languageOptions = [
  { value: "CPP", label: "C++" },
  { value: "PYTHON", label: "Python" },
  { value: "JS", label: "JavaScript" },
  { value: "C", label: "C" },
]

export default function ProblemSolvePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("CPP")
  const [userCode, setUserCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState("")

  const currentDriverCode = mockProblem.driverCodes.find((code) => code.language === selectedLanguage)

  const handleRun = async () => {
    setIsRunning(true)
    setShowResults(false)

    // Simulate API call
    setTimeout(() => {
      const mockResults: TestResult[] = [
        {
          input: "nums = [2,7,11,15], target = 9",
          expectedOutput: "[0,1]",
          actualOutput: "[0,1]",
          passed: true,
          runtime: 4,
          memory: 8.2,
        },
        {
          input: "nums = [3,2,4], target = 6",
          expectedOutput: "[1,2]",
          actualOutput: "[1,2]",
          passed: true,
          runtime: 3,
          memory: 8.1,
        },
        {
          input: "nums = [3,3], target = 6",
          expectedOutput: "[0,1]",
          actualOutput: "[0,1]",
          passed: true,
          runtime: 2,
          memory: 8.0,
        },
      ]

      setTestResults(mockResults)
      setConsoleOutput("All test cases passed successfully!")
      setShowResults(true)
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setConsoleOutput("✅ Accepted! Your solution has been submitted successfully.")
      setIsSubmitting(false)
    }, 3000)
  }

  return (
    <Box style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        style={{
          borderBottom: "1px solid #334155",
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Container size="xl" py="sm">
          <Group justify="space-between">
            <Group>
              <ActionIcon component={Link} href="/problems" variant="subtle" color="gray" size="lg">
                <IconArrowLeft size={20} />
              </ActionIcon>
              <Title order={3} c="white">
                {mockProblem.title}
              </Title>
              <Badge color={levelColors[mockProblem.level]} variant="light">
                {mockProblem.level}
              </Badge>
            </Group>

            <Group>
              <Tooltip label="Bookmark">
                <ActionIcon variant="subtle" color="gray">
                  <IconBookmark size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Share">
                <ActionIcon variant="subtle" color="gray">
                  <IconShare size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Like">
                <ActionIcon variant="subtle" color="gray">
                  <IconThumbUp size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike">
                <ActionIcon variant="subtle" color="gray">
                  <IconThumbDown size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Container>
      </Box>

      <Container size="xl" py="md">
        <Grid>
          {/* Left Panel - Problem Statement */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Card
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid #475569",
                height: "calc(100vh - 120px)",
              }}
            >
              <ScrollArea h="100%">
                <Stack gap="lg">
                  {/* Problem Description */}
                  <Box>
                    <Group mb="md">
                      {mockProblem.topics.map((topic) => (
                        <Badge key={topic} variant="outline" color="teal" size="sm">
                          {topic.replace(/_/g, " ")}
                        </Badge>
                      ))}
                    </Group>

                    <Text c="gray.2" style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                      {mockProblem.description}
                    </Text>
                  </Box>

                  <Divider color="gray.7" />

                  {/* Examples */}
                  <Box>
                    <Title order={4} c="white" mb="md">
                      Examples
                    </Title>
                    <Stack gap="md">
                      {mockProblem.exampleTestCases.map((example, index) => (
                        <Card
                          key={index}
                          padding="md"
                          style={{
                            backgroundColor: "rgba(15, 23, 42, 0.5)",
                            border: "1px solid #374151",
                          }}
                        >
                          <Stack gap="xs">
                            <Text c="white" fw={600}>
                              Example {index + 1}:
                            </Text>
                            <Box>
                              <Text c="gray.4" size="sm" mb="xs">
                                Input:
                              </Text>
                              <Code
                                block
                                style={{
                                  backgroundColor: "#1e293b",
                                  color: "#e2e8f0",
                                  border: "1px solid #475569",
                                }}
                              >
                                {example.input}
                              </Code>
                            </Box>
                            <Box>
                              <Text c="gray.4" size="sm" mb="xs">
                                Output:
                              </Text>
                              <Code
                                block
                                style={{
                                  backgroundColor: "#1e293b",
                                  color: "#e2e8f0",
                                  border: "1px solid #475569",
                                }}
                              >
                                {example.output}
                              </Code>
                            </Box>
                            <Text c="gray.3" size="sm">
                              <strong>Explanation:</strong> {example.description}
                            </Text>
                          </Stack>
                        </Card>
                      ))}
                    </Stack>
                  </Box>

                  <Divider color="gray.7" />

                  {/* Constraints */}
                  <Box>
                    <Title order={4} c="white" mb="md">
                      Constraints
                    </Title>
                    <Stack gap="xs">
                      {mockProblem.constraints.map((constraint, index) => (
                        <Text key={index} c="gray.3" size="sm">
                          • {constraint}
                        </Text>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </ScrollArea>
            </Card>
          </Grid.Col>

          {/* Right Panel - Code Editor */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap="md" h="calc(100vh - 120px)">
              {/* Code Editor */}
              <Card
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  border: "1px solid #475569",
                  flex: 1,
                }}
              >
                <Stack gap="md" h="100%">
                  {/* Editor Header */}
                  <Group justify="space-between">
                    <Select
                      data={languageOptions}
                      value={selectedLanguage}
                      onChange={(value) => setSelectedLanguage(value as Language)}
                      w={150}
                      styles={{
                        input: {
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          color: "white",
                        },
                      }}
                    />
                    <Group>
                      <Button
                        leftSection={<IconPray size={16} />}
                        variant="outline"
                        color="teal"
                        onClick={handleRun}
                        loading={isRunning}
                      >
                        Run
                      </Button>
                      <Button
                        leftSection={<IconSend size={16} />}
                        color="teal"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Group>
                  </Group>

                  {/* Code Editor */}
                  <Box style={{ flex: 1 }}>
                    <Textarea
                      placeholder="Write your solution here..."
                      value={`${currentDriverCode?.beforeCode || ""}${userCode}${currentDriverCode?.afterCode || ""}`}
                      onChange={(e) => {
                        const fullCode = e.target.value
                        const beforeCode = currentDriverCode?.beforeCode || ""
                        const afterCode = currentDriverCode?.afterCode || ""
                        const userPart = fullCode.replace(beforeCode, "").replace(afterCode, "")
                        setUserCode(userPart)
                      }}
                      styles={{
                        input: {
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          color: "#e2e8f0",
                          fontFamily: "Monaco, Consolas, 'Courier New', monospace",
                          fontSize: "14px",
                          minHeight: "300px",
                          resize: "none",
                        },
                      }}
                      minRows={15}
                    />
                  </Box>
                </Stack>
              </Card>

              {/* Test Results / Console */}
              <Card
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  border: "1px solid #475569",
                  height: "200px",
                }}
              >
                <Tabs defaultValue="console" color="teal">
                  <Tabs.List>
                    <Tabs.Tab value="console">Console</Tabs.Tab>
                    <Tabs.Tab value="testcases">Test Cases</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="console" pt="md">
                    <ScrollArea h={120}>
                      {consoleOutput ? (
                        <Alert
                          icon={consoleOutput.includes("✅") ? <IconCheck size={16} /> : <IconAlertCircle size={16} />}
                          color={consoleOutput.includes("✅") ? "green" : "blue"}
                          variant="light"
                        >
                          {consoleOutput}
                        </Alert>
                      ) : (
                        <Text c="gray.4" size="sm">
                          Run your code to see the output here...
                        </Text>
                      )}
                    </ScrollArea>
                  </Tabs.Panel>

                  <Tabs.Panel value="testcases" pt="md">
                    <ScrollArea h={120}>
                      {showResults && testResults.length > 0 ? (
                        <Stack gap="xs">
                          {testResults.map((result, index) => (
                            <Group
                              key={index}
                              justify="space-between"
                              p="xs"
                              style={{
                                backgroundColor: result.passed ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                borderRadius: "4px",
                                border: `1px solid ${result.passed ? "#10b981" : "#ef4444"}`,
                              }}
                            >
                              <Group>
                                {result.passed ? (
                                  <IconCheck size={16} color="#10b981" />
                                ) : (
                                  <IconX size={16} color="#ef4444" />
                                )}
                                <Text c="white" size="sm">
                                  Test Case {index + 1}
                                </Text>
                              </Group>
                              <Group gap="md">
                                <Group gap="xs">
                                  <IconClock size={14} color="#6b7280" />
                                  <Text c="gray.4" size="xs">
                                    {result.runtime}ms
                                  </Text>
                                </Group>
                                <Group gap="xs">
                                  <IconMeteor size={14} color="#6b7280" />
                                  <Text c="gray.4" size="xs">
                                    {result.memory}MB
                                  </Text>
                                </Group>
                              </Group>
                            </Group>
                          ))}
                        </Stack>
                      ) : (
                        <Text c="gray.4" size="sm">
                          Run your code to see test case results...
                        </Text>
                      )}
                    </ScrollArea>
                  </Tabs.Panel>
                </Tabs>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}

