import { useEffect, useRef, useState } from "react";

type Props = {
    initialState?: string,
    action: (debounceValue: string) => void,
    timeout?: number
}

export default function useDebounce({ initialState, action, timeout }: Props) {
    const [debounceValue, setDebounceValue] = useState(initialState || "")
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (initialState !== undefined && initialState !== debounceValue) {
            setDebounceValue(initialState);
        }
    }, [initialState]);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        timeoutRef.current = setTimeout(() => {
            action(debounceValue)
            console.log("task hogya")
        }, timeout || 2000)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [debounceValue])

    return { debounceValue, setDebounceValue }
}
