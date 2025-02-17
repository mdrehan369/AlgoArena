import type { Metadata } from "next"
import { Geist, Geist_Mono, Oswald, Itim } from "next/font/google"
import "./globals.css"
import { Header } from "@/components"
import { SessionProvider } from "next-auth/react"
import { ErrorHandler } from "@/components/ErrorHandler"
import StoreProvider from "./StoreProvider"
// import { MantineProvider } from "@mantine/core"

import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

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
        <html lang='en' {...mantineHtmlProps} >
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${ostwald.variable} ${itim.variable} antialiased bg-background text-text-light font-itim relative`}
            >
                <SessionProvider>
                    <StoreProvider>
                        <MantineProvider>
                            <ErrorHandler />
                            <Header />
                            {children}
                        </MantineProvider>
                    </StoreProvider>
                </SessionProvider>
            </body>
        </html>
    )
}
