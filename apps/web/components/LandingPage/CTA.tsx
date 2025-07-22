import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
} from "@mantine/core"


export default function CTA() {
    return (
        <Box
            style={{
                background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
            }}
        >
            <Container size="xl" py={80}>
                <Stack align="center" maw={700} mx="auto">
                    <Title order={2} size={48} c="white" ta="center">
                        Ready to Enter the Arena?
                    </Title>
                    <Text size="xl" c="gray.3" ta="center">
                        Join thousands of competitive programmers who are already coding, competing, and creating on Algo Arena.
                    </Text>

                    <Group w="100%" maw={500} justify="center">
                        <Button size="lg" color="teal">
                            Get Started
                        </Button>
                    </Group>

                    <Text size="sm" c="gray.4" ta="center">
                        No credit card required. Start competing in minutes.
                    </Text>
                </Stack>
            </Container>
        </Box>
    )
}
