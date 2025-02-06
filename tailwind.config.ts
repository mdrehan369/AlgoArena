import type { Config } from "tailwindcss"

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                striped:
                    "repeating-linear-gradient(45deg, #3B3A3D, #3B3A3D 5px, transparent 5px, transparent 20px)"
            },
            transitionTimingFunction: {
                "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)"
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                text: {
                    light: "var(--text-light)",
                    primary: "var(--text-primary)",
                    muted: "var(--text-muted)"
                }
            },
            keyframes: {
                meteor: {
                    "0%": { transform: "translateY(-20%) translateX(-50%)" },
                    "100%": { transform: "translateY(300%) translateX(-50%)" }
                },
                "reveal-up": {
                    "0%": { opacity: "0", transform: "translateY(80%)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                },
                "reveal-down": {
                    "0%": { opacity: "0", transform: "translateY(-80%)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                },
                "content-blur": {
                    "0%": { filter: "blur(0.3rem)" },
                    "100%": { filter: "blur(0)" }
                },
                "blink-red": {
                    "0%, 100%": {
                        backgroundColor: "rgba(239, 68, 68, 0.7)",
                        boxShadow: "0 0 30px 10px rgba(239, 68, 68, 0.5)"
                    },
                    "50%": {
                        backgroundColor: "rgba(239, 68, 68, 0.5)",
                        boxShadow: "0 0 30px 10px rgba(239, 68, 68, 1)"
                    }
                },
                appear: {
                    from: { opacity: "0.2", top: "3vh" },
                    to: { opacity: "1", top: "6vh" },
                }
            },
            animation: {
                meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
                "blink-red": "blink-red 2s infinite linear",
                appear: "appear 0.3s linear"
            },
            fontFamily: {
                ostwald: ["var(--font-ostwald)", "sans-serif"],
                itim: ["var(--font-itim)", "sans-serif"]
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
} satisfies Config
