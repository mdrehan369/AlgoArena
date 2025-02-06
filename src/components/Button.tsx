import React from "react"
import { twMerge } from "tailwind-merge"
import { BeatLoader, HashLoader } from "react-spinners"

type Props = {
    children: React.ReactNode,
    className?: string,
    disabled?: boolean;
    loading?: boolean;
    [x:string]: any
}

export function Button({children, className, disabled = false, loading = false, ...props}: Props) {
    return <button className={twMerge(' bg-primary w-fit py-2 px-4 hover:bg-transparent border-2 border-primary transition-colors hover:text-text-light text-center rounded font-bold text-sm text-text-primary disabled:opacity-60 disabled:hover:bg-primary', className)} {...props} disabled={disabled}>
        {
            !loading ?
        children
            : <BeatLoader
                color="#060b1c"
                size={10}
            />
    }
    </button>
}