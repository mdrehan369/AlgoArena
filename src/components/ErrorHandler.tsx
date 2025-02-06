"use client"

import { clearError } from "@/libs/features/Errors/errorSlice";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { XIcon } from "lucide-react"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BsExclamationTriangle } from "react-icons/bs"

export const ErrorHandler = () => {

    const error = useAppSelector(state => state.error.error)
    const dispatch = useAppDispatch()

    const pathname = usePathname()
    useEffect(() => {
        dispatch(clearError())
    }, [pathname])

    return (
        error && <div className="w-fit pl-6 pr-12 py-4 text-center bg-red-200 text-red-800 border-red-800 border-2 rounded flex items-center justify-center gap-2 absolute top-[6vh] animate-appear left-[50%] translate-x-[-50%]">
            <XIcon className="size-4 absolute top-2 right-2 cursor-pointer hover:bg-red-300 rounded transition-colors" onClick={() => dispatch(clearError())} />
            <BsExclamationTriangle />
            {error}
        </div>
    )
}