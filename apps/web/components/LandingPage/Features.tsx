import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  Box,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core"
import {
  IconCode,
  IconTrophy,
  IconUsers,
  IconCrown,
  IconClock,
  IconChartBar,
} from "@tabler/icons-react"



export default function Features() {
    return (
    <Box id="features" style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}>
        <Container size="xl" py={80}>
          <Stack align="center" mb={60}>
            <Title order={2} size={48} c="white" ta="center">
              Why Choose Algo Arena?
            </Title>
            <Text size="xl" c="gray.3" ta="center" maw={600}>
              Go beyond traditional problem-solving with features designed for the modern competitive programmer.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
            <Card
              padding="xl"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid #475569",
                transition: "border-color 0.3s ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    borderColor: "#14b8a6",
                  },
                },
              }}
            >
              <ThemeIcon size={48} variant="light" color="teal" mb="md">
                <IconCode size={24} />
              </ThemeIcon>
              <Title order={3} c="white" mb="sm">
                Solve Problems
              </Title>
              <Text c="gray.4">Access thousands of curated problems from beginner to expert level</Text>
            </Card>

            <Card
              padding="xl"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid #475569",
                transition: "border-color 0.3s ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    borderColor: "#14b8a6",
                  },
                },
              }}
            >
              <ThemeIcon size={48} variant="light" color="teal" mb="md">
                <IconTrophy size={24} />
              </ThemeIcon>
              <Title order={3} c="white" mb="sm">
                Create Competitions
              </Title>
              <Text c="gray.4">Design and host your own coding competitions with custom problems and rules</Text>
            </Card>

            <Card
              padding="xl"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid #475569",
                transition: "border-color 0.3s ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    borderColor: "#14b8a6",
                  },
                },
              }}
            >
              <ThemeIcon size={48} variant="light" color="teal" mb="md">
                <IconUsers size={24} />
              </ThemeIcon>
              <Title order={3} c="white" mb="sm">
                Community Driven
              </Title>
              <Text c="gray.4">Join a thriving community of competitive programmers and learn together</Text>
            </Card>

            <Card
              padding="xl"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid #475569",
                transition: "border-color 0.3s ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    borderColor: "#14b8a6",
                  },
                },
              }}
            >
              <ThemeIcon size={48} variant="light" color="teal" mb="md">
                <IconChartBar size={24} />
              </ThemeIcon>
              <Title order={3} c="white" mb="sm">
                Real-time Analytics
              </Title>
              <Text c="gray.4">Track your progress with detailed analytics and performance insights</Text>
            </Card>

            <Card
              padding="xl"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid #475569",
                transition: "border-color 0.3s ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    borderColor: "#14b8a6",
                  },
                },
              }}
            >
              <ThemeIcon size={48} variant="light" color="teal" mb="md">
                <IconClock size={24} />
              </ThemeIcon>
              <Title order={3} c="white" mb="sm">
                Live Contests
              </Title>
              <Text c="gray.4">Participate in live contests with real-time leaderboards and rankings</Text>
            </Card>

            <Card
              padding="xl"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid #475569",
                transition: "border-color 0.3s ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    borderColor: "#14b8a6",
                  },
                },
              }}
            >
              <ThemeIcon size={48} variant="light" color="teal" mb="md">
                <IconCrown size={24} />
              </ThemeIcon>
              <Title order={3} c="white" mb="sm">
                Global Rankings
              </Title>
              <Text c="gray.4">Compete globally and climb the leaderboards to prove your skills</Text>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>
    )
}
