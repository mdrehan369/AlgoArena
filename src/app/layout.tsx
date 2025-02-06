import type { Metadata } from "next"
import { Geist, Geist_Mono, Oswald, Itim } from "next/font/google"
import "./globals.css"
import { Header } from "@/components"
import { SessionProvider } from "next-auth/react"
import { ErrorHandler } from "@/components/ErrorHandler"
import StoreProvider from "./StoreProvider"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
})

const ostwald = Oswald({
    subsets: ["latin"],
    variable: "--font-ostwald"
})

const itim = Itim({
    weight: "400",
    style: "normal",
    variable: "--font-itim",
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: "Algo Arena",
    description: "Your Battleground for Coding Excellence!"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${ostwald.variable} ${itim.variable} antialiased bg-background text-text-light font-itim relative`}
            >
                <SessionProvider>
                    <StoreProvider>
                        <ErrorHandler />
                        <Header />
                        {children}
                    </StoreProvider>
                </SessionProvider>
            </body>
        </html>
    )
}
