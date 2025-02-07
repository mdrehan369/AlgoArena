"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    FaGithub,
    FaUser,
    FaHome,
    FaTrophy,
    FaClipboard,
    FaBullseye,
    FaStar
} from "react-icons/fa"
import ShiningButton from "./animata/button/shining-button"
import { useSession } from "next-auth/react"
import { Button } from "./Button"

const navElems = [
    {
        path: "/",
        name: "Home",
        icon: <FaHome size={15} />
    },
    {
        path: "/compete",
        name: "Compete",
        icon: <FaTrophy size={15} />
    },
    {
        path: "/practice",
        name: "Practice",
        icon: <FaBullseye size={15} />
    },
    {
        path: "/leaderboard",
        name: "Leaderboard",
        icon: <FaClipboard size={15} />
    }
]

const iconClassNames = "border-[2px] border-transparent hover:border-gray-400 text-gray-300 cursor-pointer p-2 size-10 transition-colors rounded-full"

export function Header() {
    
    const router = useRouter()
    const pathname = usePathname()
    const { status, data } = useSession()

    return (
        pathname.includes("auth") ||
        <header className='bg-transparent fixed top-0 left-0 z-20 text-white w-full flex items-center justify-between px-10'>
            <div className='container mx-auto flex justify-between items-center p-4'>
                <Image
                    src={"/logo.svg"}
                    width={200}
                    height={50}
                    alt='Algo Arena'
                    onClick={() => router.push("/")}
                />

                <nav className=" flex-grow items-center justify-center flex gap-16">
                    <ul className='flex gap-14 w-fit items-center justify-center'>
                        {navElems.map((elem, index) => (
                            <li key={index} className={`${elem.path === pathname ? 'text-gray-50 after:w-full' : 'text-gray-400 after:w-0'} hover:text-gray-50 transition-colors font-normal font-ostwald tracking-wider text-sm flex items-center justify-center gap-2 after:w-0 after:h-[3px] after:bg-indigo-500 hover:after:w-full after:absolute relative after:bottom-[-4px] after:left-0 after:transition-all`}>
                                {elem.icon}
                                <Link href={elem.path}>{elem.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <ShiningButton><FaStar size={15} /><span>Star on Github</span><FaGithub size={15} /></ShiningButton>
                </nav>

                <div className=" flex items-center justify-center gap-4 w-20">
                    {
                        status !== "loading" && (status === "authenticated" ? (
                            data.user?.image ?
                                <Image src={data.user.image} width={40} height={40} alt="" className="rounded-full cursor-pointer" />
                            : <FaUser className={iconClassNames} />
                        )
                        : <Button onClick={() => router.push("auth/signin")}>Sign In</Button>)
                    }
                </div>
            </div>
        </header>
    )
}
