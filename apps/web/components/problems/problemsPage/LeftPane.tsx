"use client"

import {
  Grid,
  Card,
  Title,
  Text,
  Group,
  Stack,
  Box,
  Badge,
  Divider,
  Code,
  ScrollArea,
} from "@mantine/core"
import { useAppSelector } from "@lib/hooks"


export default function DescriptionBox() {

  const problem = useAppSelector(state => state.problemPage.problem)

  return (
    <Grid.Col span={{ base: 12, lg: 4 }}>
      <Card
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          border: "1px solid #475569",
          height: "calc(100vh - 160px)",
        }}
      >
        <ScrollArea h="100%" type="scroll">
          <Stack gap="lg">
            {/* Problem Description */}
            <Box>
              <Group mb="md">
                {problem?.topics.map((topic) => (
                  <Badge key={topic} variant="outline" color="teal" size="sm">
                    {topic.replace(/_/g, " ")}
                  </Badge>
                ))}
              </Group>

              <Text c="gray.2" style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                {problem?.description}
              </Text>
            </Box>

            <Divider color="gray.7" />

            {/* Examples */}
            <Box>
              <Title order={4} c="white" mb="md">
                Examples
              </Title>
              <Stack gap="md">
                {problem?.exampleTestCases.map((example, index) => (
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
                {problem?.constraints.map((constraint, index) => (
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

  )
}
