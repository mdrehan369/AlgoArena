export const Separator = ({ text }: { text: string }) => {
    return (
        <div className='w-full flex items-center justify-center gap-2'>
            <div className='w-full h-[1px] bg-primary'></div>
            <span>{text}</span>
            <div className='w-full h-[1px] bg-primary'></div>
        </div>
    )
}
