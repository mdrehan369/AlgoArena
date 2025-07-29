import HeroSection from "@components/LandingPage/HeroSection"
import Features from "@components/LandingPage/Features"
import HowItWorks from "@components/LandingPage/HowItWorks"
import CTA from "@components/LandingPage/CTA"
import { Box } from "@mantine/core"
import { secondaryColors } from "@utils/colors"

export default function AlgoArenaLanding() {
    return (
        <Box style={{ backgroundColor: secondaryColors.DARKER, minHeight: "100vh" }}>
            <HeroSection />
            <Features />
            <HowItWorks />
            <CTA />
        </Box>
    )
}
