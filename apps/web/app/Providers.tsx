'use client'

import '@mantine/core/styles.css';

import Header from "../components/Header";
import Footer from "../components/Footer";
import StoreProvider from "./StoreProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const client = new QueryClient()
    return (
        <QueryClientProvider client={client}>
            <StoreProvider>
                <Header />
                {children}
                <Footer />
            </StoreProvider>
        </QueryClientProvider>
    );
}
