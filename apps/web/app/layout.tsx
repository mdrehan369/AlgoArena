import type { Metadata } from "next";
import "./globals.css";

import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import Providers from "./Providers.tsx";
import { validateConfig } from "config/env.config.ts";

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
                    <Providers>
                        {children}
                    </Providers>
                </MantineProvider>
            </body>
        </html>
    );
}
