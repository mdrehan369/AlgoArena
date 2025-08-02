"use client"

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
import { useSession } from "../lib/auth-client"
import { useRouter } from "next/navigation"
import ProfileMenu from "./profile/ProfileMenu"
import Link from "next/link"

type NavItems = {
    name: string,
    href: string
}

const navItems: NavItems[] = [
    {
        name: "Problems",
        href: "/problems"
    },
    {
        name: "Leaderboard",
        href: "/leaderboard"
    },
    {
        name: "Features",
        href: "#features"
    },
    {
        name: "How It Works",
        href: "#how-it-works"
    }
]

export default function Header() {
    const router = useRouter()
    const session = useSession()

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
                        {
                            navItems.map(item =>
                                <Anchor component={Link} key={item.href} href={item.href} c="gray.4" style={{ textDecoration: "none" }}>
                                    {item.name}
                                </Anchor>)
                        }
                        {
                            !session.data &&
                            <Button variant="outline" color="teal" onClick={() => router.push("/login")}>
                                Sign In
                            </Button>
                        }
                        <Button color="teal">Get Started</Button>
                        <ProfileMenu />
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}
