"use client"

// import Image from "next/image"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { CldUploadWidget, CldImage } from "next-cloudinary"
import { deleteImage } from "@/actions/cloudinary.actions"
import { Button } from "./Button"

type Props = {
    url: string | null
    className?: string
}

export function Avatar({ url, className, ...props }: Props) {
    const [public_id, setPublic_id] = useState<string | null>(url)

    const successHandler = (res: any, opts: any) => {
        if (public_id !== null) {
            deleteImage(public_id)
        }
        setPublic_id(res.info?.public_id)
    }

    const removeImage = () => {
        if (public_id !== null) {
            deleteImage(public_id)
            setPublic_id(null)
        }
    }

    return (
        <div className=' flex flex-col items-center justify-center gap-10'>
            <div
                className={twMerge(
                    " bg-secondary size-80 relative text-center rounded-full overflow-hidden border-dotted border-2 border-primary p-4",
                    className
                )}
                {...props}
            >
                <CldUploadWidget
                    uploadPreset='AlgoArenaPresets'
                    onSuccess={successHandler}
                >
                    {({ open }) => {
                        return (
                            <CldImage
                                priority={true}
                                onClick={() => open()}
                                src={
                                    public_id ||
                                    process.env.NEXT_PUBLIC_CAMERA_PUB_ID!
                                }
                                alt=''
                                fill={true}
                                className='p-0 size-80 object-cover'
                            />
                        )
                    }}
                </CldUploadWidget>
            </div>
            {public_id && <Button className='' onClick={removeImage}>Remove Image</Button>}
        </div>
    )
}
