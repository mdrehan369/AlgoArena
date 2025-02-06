import { UseFormRegister, FieldValues, FieldError } from "react-hook-form"
import { twMerge } from "tailwind-merge"


type FormFieldProps = {
    type?: string
    label?: string
    placeHolder?: string
    name: string
    className?: string
    register: UseFormRegister<any>
    fieldError?: FieldError
}

export function FormField({
    type = 'text',
    placeHolder,
    name,
    label,
    register,
    fieldError,
    className
}: FormFieldProps) {
    return (
        <div className={twMerge("flex flex-col w-[20vw] items-start justify-center gap-1", className)}>
            <span className="uppercase text-sm font-itim">{label || name}</span>
            <input
                type={type}
                className={twMerge(' bg-primary border-primary rounded-sm border-[1px] w-full p-2')}
                placeholder={placeHolder}
                {...register(name)}
            />
            {fieldError && <span className=' text-red-400'>{fieldError.message}</span>}
        </div>
    )
}