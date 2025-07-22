import HeroSection from "../components/LandingPage/HeroSection"
import Features from "../components/LandingPage/Features"
import HowItWorks from "../components/LandingPage/HowItWorks"
import CTA from "../components/LandingPage/CTA"
import { Box } from "@mantine/core"

export default function AlgoArenaLanding() {
    return (
        <Box style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
            <HeroSection />
            <Features />
            <HowItWorks />
            <CTA />
        </Box>
    )
}
