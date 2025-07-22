import {
  Container,
  Title,
  Text,
  Stack,
  Box,
  Center,
  SimpleGrid,
} from "@mantine/core"


export default function HowItWorks() {
    return (
        <Box id="how-it-works">
        <Container size="xl" py={80}>
          <Stack align="center" mb={60}>
            <Title order={2} size={48} c="white" ta="center">
              How Algo Arena Works
            </Title>
            <Text size="xl" c="gray.3" ta="center" maw={600}>
              From solving your first problem to hosting global competitions
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl">
            <Stack align="center">
              <Center
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 184, 166, 0.2)",
                }}
              >
                <Text size="xl" fw={700} c="teal">
                  1
                </Text>
              </Center>
              <Title order={3} c="white" ta="center">
                Sign Up & Practice
              </Title>
              <Text c="gray.4" ta="center">
                Create your account and start solving problems to build your coding skills
              </Text>
            </Stack>

            <Stack align="center">
              <Center
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 184, 166, 0.2)",
                }}
              >
                <Text size="xl" fw={700} c="teal">
                  2
                </Text>
              </Center>
              <Title order={3} c="white" ta="center">
                Join Competitions
              </Title>
              <Text c="gray.4" ta="center">
                Participate in live contests and compete with programmers worldwide
              </Text>
            </Stack>

            <Stack align="center">
              <Center
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 184, 166, 0.2)",
                }}
              >
                <Text size="xl" fw={700} c="teal">
                  3
                </Text>
              </Center>
              <Title order={3} c="white" ta="center">
                Create Your Own
              </Title>
              <Text c="gray.4" ta="center">
                Design and host your own competitions with custom problems and rules
              </Text>
            </Stack>

            <Stack align="center">
              <Center
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 184, 166, 0.2)",
                }}
              >
                <Text size="xl" fw={700} c="teal">
                  4
                </Text>
              </Center>
              <Title order={3} c="white" ta="center">
                Climb Rankings
              </Title>
              <Text c="gray.4" ta="center">
                Build your reputation and climb the global leaderboards
              </Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    )
}
