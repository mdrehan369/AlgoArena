"use client"

import { Container, Title, Text, Button, Card, Stack, Box, ThemeIcon, Anchor, Group, Divider } from "@mantine/core"
import { IconCode, IconBrandGoogle, IconBrandGithub, IconArrowLeft, IconBrandFacebook } from "@tabler/icons-react"
import Link from "next/link"
import { secondaryColors, textColors } from "../../../utils/colors"
import { signIn } from "../../../lib/auth-client"

const oauthOptions = [
    {
        provider: "google",
        icon: IconBrandGoogle,
        label: "Continue with Google",
    },
    {
        provider: "github",
        icon: IconBrandGithub,
        label: "Continue with GitHub",
    },
    {
        provider: "facebook",
        icon: IconBrandFacebook,
        label: "Continue with Facebook",
    }
]

export default function LoginPage() {
    return (
        <Box
            style={{
                backgroundColor: secondaryColors.DARKER,
                minHeight: "100vh",
                width: "100%",
            }}
        >
            <Container size="xs" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
                <Card
                    shadow="xl"
                    padding="xl"
                    radius="lg"
                    style={{
                        backgroundColor: secondaryColors.DEFAULT,
                        border: "1px solid #475569",
                        backdropFilter: "blur(10px)",
                        width: "100%",
                    }}
                >
                    <Stack align="center" gap="lg">
                        {/* Back to Home Link */}
                        <Group justify="flex-start" w="100%">
                            <Anchor component={Link} href="/" c={textColors.GRAY} style={{ textDecoration: "none" }}>
                                <Group gap="xs">
                                    <IconArrowLeft size={16} />
                                    <Text size="sm">Back to Home</Text>
                                </Group>
                            </Anchor>
                        </Group>

                        {/* Logo and Branding */}
                        <Stack align="center" gap="md">
                            <ThemeIcon size={60} variant="gradient" gradient={{ from: "teal", to: "green" }}>
                                <IconCode size={32} />
                            </ThemeIcon>
                            <Title order={1} c="white" ta="center">
                                Welcome to Algo Arena
                            </Title>
                            <Text c="gray.3" ta="center" size="lg">
                                Sign in to start your competitive programming journey
                            </Text>
                        </Stack>

                        <Divider w="100%" color="gray.7" />

                        {/* OAuth Buttons */}
                        <Stack gap="md" w="100%">
                            {
                                oauthOptions.map((option) => (
                                    <div key={option.provider}
                                        className="hover:bg-primary-default transition-colors rounded-[8px]">

                                        <Button
                                            size="lg"
                                            variant="outline"
                                            leftSection={<option.icon size={20} />}
                                            styles={{
                                                root: {
                                                    backgroundColor: "transparent",
                                                    border: "1px solid #475569",
                                                    color: "white",
                                                },
                                            }}
                                            fullWidth
                                            onClick={() => signIn.social({ provider: option.provider })}
                                        >
                                            {option.label}
                                        </Button>
                                    </div>
                                ))
                            }

                        </Stack>

                        <Divider w="100%" color="gray.7" />

                        {/* Additional Info */}
                        <Stack align="center" gap="xs">
                            <Text c="gray.4" size="sm" ta="center">
                                By signing in, you agree to our{" "}
                                <Anchor href="#" c="teal" style={{ textDecoration: "none" }}>
                                    Terms of Service
                                </Anchor>{" "}
                                and{" "}
                                <Anchor href="#" c="teal" style={{ textDecoration: "none" }}>
                                    Privacy Policy
                                </Anchor>
                            </Text>
                        </Stack>

                        {/* Features Preview */}
                        <Box
                            style={{
                                backgroundColor: "rgba(20, 184, 166, 0.1)",
                                border: "1px solid rgba(20, 184, 166, 0.2)",
                                borderRadius: "8px",
                                padding: "16px",
                                width: "100%",
                            }}
                        >
                            <Text c="teal" size="sm" fw={600} mb="xs">
                                What you&apos;ll get access to:
                            </Text>
                            <Stack gap="xs">
                                <Text c="gray.3" size="sm">
                                    • Solve 10,000+ coding problems
                                </Text>
                                <Text c="gray.3" size="sm">
                                    • Create and host your own competitions
                                </Text>
                                <Text c="gray.3" size="sm">
                                    • Join live contests and climb global rankings
                                </Text>
                                <Text c="gray.3" size="sm">
                                    • Connect with elite competitive programmers
                                </Text>
                            </Stack>
                        </Box>
                    </Stack>
                </Card>
            </Container>

            {/* Floating Elements for Visual Appeal */}
            <Box
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }}
            />
            <Box
                style={{
                    position: "absolute",
                    bottom: "20%",
                    right: "15%",
                    width: "150px",
                    height: "150px",
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }}
            />
        </Box>
    )
}
