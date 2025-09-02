"use client"

import { useAppDispatch, useAppSelector } from "@lib/hooks"
import {
  Grid,
  Card,
  Text,
  Button,
  Group,
  Stack,
  Tabs,
  ScrollArea,
  Accordion,
  Box,
  Badge,
  Textarea,
} from "@mantine/core"
import {
  IconPray,
  IconSend,
  IconClock,
  IconMeteor,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconMinus,
  IconChevronDown,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"
import CodeEditor from "./CodeEditor"
import { setIsSubmiting, startRunTest } from "@lib/features/problemsPage/problemPage.slice"

import "public/css/tabs.css"
import CustomLoader from "@components/Loader"
import { primaryColors, secondaryColors, textColors } from "@utils/colors"

export default function RightPane() {

  const [tab, setTab] = useState<"results" | "testcases">("results")
  const { isRunning, testResults, compileError, problem } = useAppSelector(state => state.problemPage)

  const dispatch = useAppDispatch()

  const handleRun = async () => {
    setTab("results")
    dispatch(startRunTest())
  }

  const handleSubmit = async () => {
    dispatch(setIsSubmiting(true))
  }

  return (
    <Grid.Col span={{ base: 12, lg: 8 }}>
      <Group gap="md" h="calc(100vh - 160px)" className="">
        {/* Code Editor */}
        <Card
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            border: "1px solid #475569",
            flex: 1,
            height: "100%",
          }}
        >
          <Stack gap="md" h="100%">
            {/* Editor Header */}
            <Group justify="right">
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
                >
                  Submit
                </Button>
              </Group>
            </Group>
            <CodeEditor />
          </Stack>
        </Card>

        {/* Test Results / Console */}
        <Card
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            border: "1px solid #475569",
            height: "100%",
            width: "30%"
          }}
        >
          <Tabs defaultValue="testcases" value={tab} onChange={(val) => setTab(val as ("results" | "testcases"))} color="teal" h="100%">
            <Tabs.List>
              <Tabs.Tab className="tabs" value="testcases" >Test Cases</Tabs.Tab>
              <Tabs.Tab className="tabs" value="results">Results</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="testcases" pt="md">
              <ScrollArea h={"100%"} type="scroll">
                {
                  <Stack gap="xs">
                    <Accordion chevron={<IconChevronDown color={primaryColors.BACK_GROUND} />} variant="separated" multiple style={{ border: "0px" }}>
                      {problem?.testCases.map((testCase, index) => {
                        return (
                          <Accordion.Item style={{ backgroundColor: "transparent", border: "0px" }} key={testCase.id} value={`case-${index}`}>
                            <Accordion.Control
                              style={{
                                backgroundColor: secondaryColors.DARKER,
                                borderRadius: "8px",
                                padding: "2px 16px",
                              }}

                            >
                              <Stack gap="xs">
                                <Group gap="xs" justify="space-between">
                                  <Group>
                                    <Text c={textColors.GRAY} size="sm" fw={500}>
                                      Test Case {index + 1}
                                    </Text>
                                  </Group>
                                </Group>
                              </Stack>

                            </Accordion.Control>
                            <Accordion.Panel style={{ width: "100%" }}>
                              <Stack gap="sm" p="xs" style={{ backgroundColor: "rgba(30, 41, 59, 0.6)", borderRadius: "10px", border: "0px", overflowY: "scroll", maxHeight: "40vh" }}>
                                <div>
                                  <Text c="gray.4" size="xs" fw={500}>
                                    Input:
                                  </Text>
                                  <Card
                                    radius="sm"
                                    p="xs"
                                    style={{ backgroundColor: "rgba(15,23,42,0.7)" }}
                                  >
                                    <Text c="white" size="sm" ff="monospace">
                                      {testCase.input}
                                    </Text>
                                  </Card>
                                </div>

                                <div>
                                  <Text c="gray.4" size="xs" fw={500}>
                                    Expected Output:
                                  </Text>
                                  <Card
                                    radius="sm"
                                    p="xs"
                                    style={{ backgroundColor: "rgba(15,23,42,0.7)" }}
                                  >
                                    <Text c="teal.3" size="sm" ff="monospace">
                                      {testCase.output}
                                    </Text>
                                  </Card>
                                </div>
                              </Stack>
                            </Accordion.Panel>
                          </Accordion.Item>
                        )
                      })}
                    </Accordion>
                  </Stack>
                }
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="results" pt="md">
              <ScrollArea h={"82vh"} type="scroll">
                {
                  isRunning ? <CustomLoader /> :
                    compileError ? <Card
                      style={{ backgroundColor: "rgba(252, 116, 125, 0.2)", padding: "6px", border: "2px solid #ff545f", color: "#ff545f" }}
                    >
                      {compileError}
                    </Card> :
                      testResults.length > 0 ? (
                        <Stack gap="xs">
                          <Accordion chevron={null} variant="separated" multiple style={{ border: "0px" }}>
                            {testResults.map((result, index) => {
                              const getStatusConfig = (status: string) => {
                                switch (status) {
                                  case "PASS":
                                    return {
                                      icon: <IconCheck size={16} />,
                                      color: "#10b981",
                                      bgColor: "rgba(16, 185, 129, 0.1)",
                                      borderColor: "#10b981",
                                      label: "Passed",
                                    }
                                  case "FAIL":
                                    return {
                                      icon: <IconX size={16} />,
                                      color: "#ef4444",
                                      bgColor: "rgba(239, 68, 68, 0.1)",
                                      borderColor: "#ef4444",
                                      label: "Wrong Answer",
                                    }
                                  case "TIME_LIMIT_EXCEEDED":
                                    return {
                                      icon: <IconClock size={16} />,
                                      color: "#f59e0b",
                                      bgColor: "rgba(245, 158, 11, 0.1)",
                                      borderColor: "#f59e0b",
                                      label: "Time Limit Exceeded",
                                    }
                                  case "MEMORY_LIMIT_EXCEEDED":
                                    return {
                                      icon: <IconMeteor size={16} />,
                                      color: "#8b5cf6",
                                      bgColor: "rgba(139, 92, 246, 0.1)",
                                      borderColor: "#8b5cf6",
                                      label: "Memory Limit Exceeded",
                                    }
                                  case "RUNTIME_ERROR":
                                    return {
                                      icon: <IconAlertTriangle size={16} />,
                                      color: "#f97316",
                                      bgColor: "rgba(249, 115, 22, 0.1)",
                                      borderColor: "#f97316",
                                      label: "Runtime Error",
                                    }
                                  default:
                                    return {
                                      icon: <IconMinus size={16} />,
                                      color: "#6b7280",
                                      bgColor: "rgba(107, 114, 128, 0.1)",
                                      borderColor: "#6b7280",
                                      label: "Unknown",
                                    }
                                }
                              }

                              const statusConfig = getStatusConfig(result.status)
                              return (
                                <Accordion.Item style={{ backgroundColor: "transparent", border: "0px" }} key={result.testCase.id} value={`case-${index}`}>
                                  <Accordion.Control
                                    style={{
                                      backgroundColor:
                                        result.status === "PASS"
                                          ? "rgba(16, 185, 129, 0.1)"
                                          : "rgba(239, 68, 68, 0.1)",
                                      borderRadius: "8px",
                                      border: `1px solid ${result.status === "PASS" ? "#10b981" : "#ef4444"
                                        }`,
                                      padding: "2px 8px",
                                    }}

                                  >

                                    <Stack gap="xs">
                                      <Group gap="xs" justify="space-between">
                                        <Group>
                                          <Box style={{ color: statusConfig.color }}>
                                            {statusConfig.icon}
                                          </Box>
                                          <Text c="white" size="sm" fw={500}>
                                            Test Case {index + 1}
                                          </Text>
                                        </Group>
                                        <Badge
                                          size="xs"
                                          variant="light"
                                          color={result.status === "PASS" ? "green" : "red"}
                                        >
                                          {statusConfig.label}
                                        </Badge>
                                      </Group>

                                      <Group gap="md">
                                        <Group gap="xs">
                                          <IconClock size={12} color="#6b7280" />
                                          <Text c="gray.4" size="xs">
                                            {result.runtime.toFixed(2)}ms
                                          </Text>
                                        </Group>
                                        <Group gap="xs">
                                          <IconMeteor size={12} color="#6b7280" />
                                          <Text c="gray.4" size="xs">
                                            {result.memory.toFixed(2)}MB
                                          </Text>
                                        </Group>
                                      </Group>
                                    </Stack>

                                  </Accordion.Control>
                                  <Accordion.Panel style={{ width: "100%" }}>
                                    <Stack gap="sm" p="xs" style={{ backgroundColor: "rgba(30, 41, 59, 0.6)", borderRadius: "10px", border: "0px", overflowY: "scroll", maxHeight: "40vh" }}>
                                      <div>
                                        <Text c="gray.4" size="xs" fw={500}>
                                          Input:
                                        </Text>
                                        <Card
                                          radius="sm"
                                          p="xs"
                                          style={{ backgroundColor: "rgba(15,23,42,0.7)" }}
                                        >
                                          <Text c="white" size="sm" ff="monospace">
                                            {result.testCase.input}
                                          </Text>
                                        </Card>
                                      </div>

                                      <div>
                                        <Text c="gray.4" size="xs" fw={500}>
                                          Expected Output:
                                        </Text>
                                        <Card
                                          radius="sm"
                                          p="xs"
                                          style={{ backgroundColor: "rgba(15,23,42,0.7)" }}
                                        >
                                          <Text c="teal.3" size="sm" ff="monospace">
                                            {result.testCase.output}
                                          </Text>
                                        </Card>
                                      </div>

                                      <div>
                                        <Text c="gray.4" size="xs" fw={500}>
                                          Your Output:
                                        </Text>
                                        <Card
                                          withBorder
                                          radius="sm"
                                          p="xs"
                                          style={{
                                            backgroundColor: "rgba(15,23,42,0.7)",
                                            border:
                                              result.status === "PASS"
                                                ? "1px solid #10b981"
                                                : "1px solid #ef4444",
                                          }}
                                        >
                                          <Text
                                            c={result.status === "PASS" ? "teal.3" : "red.3"}
                                            size="sm"
                                            ff="monospace"
                                          >
                                            {result.output}
                                          </Text>
                                        </Card>
                                      </div>

                                      {
                                        result.console != "" &&
                                        <div>
                                          <Text c="gray.4" size="xs" fw={500}>
                                            Console:
                                          </Text>
                                          <Card
                                            withBorder
                                            radius="sm"
                                            p="xs"
                                            style={{
                                              backgroundColor: "rgba(15,23,42,0.7)",
                                              border:
                                                result.status === "PASS"
                                                  ? "1px solid #10b981"
                                                  : "1px solid #ef4444",
                                            }}
                                          >
                                            <Textarea
                                              c={result.status === "PASS" ? "teal.3" : "red.3"}
                                              size="sm"
                                              ff="monospace"
                                              value={result.console}
                                              readOnly
                                              styles={{ input: { backgroundColor: "transparent", border: "0px", color: textColors.GRAY, padding: "0px" } }}
                                            />
                                          </Card>
                                        </div>

                                      }
                                    </Stack>
                                  </Accordion.Panel>
                                </Accordion.Item>
                              )
                            })}
                          </Accordion>
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
      </Group >
    </Grid.Col >

  )
}
