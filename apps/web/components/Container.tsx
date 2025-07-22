import { Box } from "@mantine/core";

export default function Container({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
            {children}
        </Box>
    );
}
