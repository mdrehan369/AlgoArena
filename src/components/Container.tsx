import React from "react"
import { twMerge } from "tailwind-merge"

type Props = {
    children: React.ReactNode,
    className?: string
}

export function Container({children, className=''}: Props) {
    return (
        <div className={twMerge('w-[100vw] min-h-[100vh]', className)}>
            {children}
        </div>
    )
}