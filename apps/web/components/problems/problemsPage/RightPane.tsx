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
  Alert,
  Accordion,
} from "@mantine/core"
import {
  IconPray,
  IconSend,
  IconClock,
  IconMeteor,
  IconCheck,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react"
import { useState } from "react"
import CodeEditor from "./CodeEditor"
import { startRunTest } from "@lib/features/problemsPage/problemPage.slice"

import "public/css/tabs.css"
import CustomLoader from "@components/Loader"

export default function RightPane() {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState("")
  const [tab, setTab] = useState<"console" | "testcases">("console")
  const { isRunning, testResults, compileError } = useAppSelector(state => state.problemPage)

  const dispatch = useAppDispatch()

  const handleRun = async () => {
    setTab("testcases")
    dispatch(startRunTest())
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setConsoleOutput("✅ Accepted! Your solution has been submitted successfully.")
      setIsSubmitting(false)
    }, 3000)
  }

  console.log("parent rendering")


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
                  loading={isSubmitting}
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
          <Tabs defaultValue="console" value={tab} onChange={(val) => setTab(val as ("console" | "testcases"))} color="teal" h="100%">
            <Tabs.List>
              <Tabs.Tab className="tabs" value="console" >Console</Tabs.Tab>
              <Tabs.Tab className="tabs" value="testcases">Test Cases</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="console" pt="md">
              <ScrollArea h={"100%"}>
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
              <ScrollArea h={"100%"}>
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
                            {testResults.map((result, index) => (
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
                                  <Group justify="space-between">
                                    <Group>
                                      {result.status === "PASS" ? (
                                        <IconCheck size={18} color="#10b981" />
                                      ) : (
                                        <IconX size={18} color="#ef4444" />
                                      )}
                                      <Text fw={500} c="white" size="sm">
                                        Test Case {index + 1}
                                      </Text>
                                    </Group>
                                    <Group gap="md">
                                      <Group gap="xs">
                                        <IconClock size={14} color="#6b7280" />
                                        <Text c="gray.4" size="xs">
                                          {result.runtime} ms
                                        </Text>
                                      </Group>
                                      <Group gap="xs">
                                        <IconMeteor size={14} color="#6b7280" />
                                        <Text c="gray.4" size="xs">
                                          {result.memory} MB
                                        </Text>
                                      </Group>
                                    </Group>
                                  </Group>
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
                                        withBorder
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
                                  </Stack>
                                </Accordion.Panel>
                              </Accordion.Item>
                            ))}
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
