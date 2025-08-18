"use client"

import { useAppSelector } from "@lib/hooks"
import {
  Grid,
  Card,
  Text,
  Button,
  Group,
  Stack,
  Box,
  Tabs,
  Select,
  Textarea,
  ScrollArea,
  Alert,
} from "@mantine/core"
import { Language, TestCase } from "@repo/db"
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

const languageOptions = [
  { value: "CPP", label: "C++" },
  { value: "PYTHON", label: "Python" },
  { value: "JS", label: "JavaScript" },
  { value: "C", label: "C" },
]

export default function RightPane() {

  const problem = useAppSelector(state => state.problemPage.problem)

  const [selectedLanguage, setSelectedLanguage] = useState<Language>("CPP")
  const [userCode, setUserCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestCase[]>([])
  const [showResults, setShowResults] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState("")

  const currentDriverCode = problem?.driverCodes.find((code) => code.language === selectedLanguage)

  const handleRun = async () => {
    setIsRunning(true)
    setShowResults(false)
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

            {/* Code Editor */}
            {/* <Box style={{ flex: 1 }}> */}
            {/*   <Textarea */}
            {/*     placeholder="Write your solution here..." */}
            {/*     value={`${currentDriverCode?.beforeCode || ""}${userCode}${currentDriverCode?.afterCode || ""}`} */}
            {/*     onChange={(e) => { */}
            {/*       const fullCode = e.target.value */}
            {/*       const beforeCode = currentDriverCode?.beforeCode || "" */}
            {/*       const afterCode = currentDriverCode?.afterCode || "" */}
            {/*       const userPart = fullCode.replace(beforeCode, "").replace(afterCode, "") */}
            {/*       setUserCode(userPart) */}
            {/*     }} */}
            {/*     styles={{ */}
            {/*       input: { */}
            {/*         backgroundColor: "#1e293b", */}
            {/*         border: "1px solid #475569", */}
            {/*         color: "#e2e8f0", */}
            {/*         fontFamily: "Monaco, Consolas, 'Courier New', monospace", */}
            {/*         fontSize: "14px", */}
            {/*         minHeight: "300px", */}
            {/*         resize: "none", */}
            {/*       }, */}
            {/*     }} */}
            {/*     minRows={15} */}
            {/*   /> */}
            {/* </Box> */}

            <CodeEditor />
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
                          backgroundColor: result.output ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                          borderRadius: "4px",
                          border: `1px solid ${result.output ? "#10b981" : "#ef4444"}`,
                        }}
                      >
                        <Group>
                          {result.output ? (
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
                              {result.id}ms
                            </Text>
                          </Group>
                          <Group gap="xs">
                            <IconMeteor size={14} color="#6b7280" />
                            <Text c="gray.4" size="xs">
                              {result.id}MB
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

  )
}
