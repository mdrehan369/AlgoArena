import { twMerge } from "tailwind-merge"

type Props = {
    type?: string
    label?: string
    placeHolder?: string
    name: string
    className?: string
}

export function Input({
    type,
    label,
    placeHolder,
    name,
    className,
    ...props
}: Props) {
    return (
        <div className={twMerge("w-[30vw] h-[8vh]", className)}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                className=' w-full h-full p-3 rounded-sm border-[1px]'
                type={type}
                {...props}
                id={name}
                placeholder={placeHolder}
            />
        </div>
    )
}
