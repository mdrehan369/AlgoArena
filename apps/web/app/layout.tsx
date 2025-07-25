import type { Metadata } from "next";
import "./globals.css";

import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { validateConfig } from "../config/envConfig.ts"

export const metadata: Metadata = {
    title: "Algo Arena",
    description: "The Arena Built for Programmers, by Programmers.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    validateConfig()
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider>
                    <Header />
                    {children}
                    <Footer />
                </MantineProvider>
            </body>
        </html>
    );
}
