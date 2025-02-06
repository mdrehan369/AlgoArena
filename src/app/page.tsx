// import { signIn } from "@/auth";
import { Button, Container } from "@/components"
import AnimatedBeam from "@/components/animata/background/animated-beam"
import WaveReveal from "@/components/animata/text/wave-reveal"
import { Sword, SwordIcon } from "lucide-react"
import { GiSwordClash } from "react-icons/gi"

export default function Home() {
    return (
        <Container>
            <AnimatedBeam className='w-full min-h-[100vh] h-auto text-white'>
                <div className='w-full h-[100vh] flex flex-col items-center justify-center gap-10'>
                    <WaveReveal
                        text='Algo Arena'
                        className='text-8xl font-bold font-ostwald'
                    />
                    <p className='text-gray-300 text-center text-xl text-wrap font-itim'>
                        Welcome to Algo Arena, where aspiring coders and
                        problem-solving champions
                        <br /> come to test their skills, conquer challenges,
                        and rise to the top of the leaderboard!
                    </p>
                    <Button className="text-xl tracking-wider flex items-center justify-between gap-2">
                        <GiSwordClash />
                        <span>Let's Battle</span>
                        <GiSwordClash />
                    </Button>
                </div>
            </AnimatedBeam>
        </Container>
    )
}
