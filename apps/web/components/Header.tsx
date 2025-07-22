
import {
    Container,
    Title,
    Button,
    Group,
    Anchor,
    Box,
    ThemeIcon,
} from "@mantine/core"
import {
    IconCode,
} from "@tabler/icons-react"
export default function Header() {
    return (
        <Box
            style={{
                borderBottom: "1px solid #334155",
                backgroundColor: "#0f172a",
                backdropFilter: "blur(8px)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            <Container size="xl" py="md">
                <Group justify="space-between">
                    <Group>
                        <ThemeIcon size="lg" variant="gradient" gradient={{ from: "teal", to: "green" }}>
                            <IconCode size={20} />
                        </ThemeIcon>
                        <Title order={2} c="white">
                            Algo Arena
                        </Title>
                    </Group>

                    <Group visibleFrom="md">
                        <Anchor href="#features" c="gray.4" style={{ textDecoration: "none" }}>
                            Features
                        </Anchor>
                        <Anchor href="#how-it-works" c="gray.4" style={{ textDecoration: "none" }}>
                            How it Works
                        </Anchor>
                        <Anchor href="#pricing" c="gray.4" style={{ textDecoration: "none" }}>
                            Pricing
                        </Anchor>
                        <Button variant="outline" color="teal">
                            Sign In
                        </Button>
                        <Button color="teal">Get Started</Button>
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}
