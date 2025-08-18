"use client"

import { useAppSelector } from "@lib/hooks"
import {
  Container,
  Title,
  Group,
  Box,
  Badge,
  ActionIcon,
  Tooltip,
} from "@mantine/core"
import {
  IconArrowLeft,
  IconBookmark,
  IconShare,
  IconThumbUp,
  IconThumbDown,
} from "@tabler/icons-react"
import { levelColors } from "@utils/constants"
import Link from "next/link"

export default function ProblemHeader() {

  const problem = useAppSelector(state => state.problemPage.problem)

  return (
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
              {problem?.title}
            </Title>
            <Badge color={problem ? levelColors[problem.level] : ""} variant="light">
              {problem?.level}
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
  )
}
