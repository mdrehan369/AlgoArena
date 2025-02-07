"use client"

// import Image from "next/image"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { CldUploadWidget, CldImage } from "next-cloudinary"
import { deleteImage } from "@/actions/cloudinary.actions"
import { Button } from "./Button"
import { Prisma } from "@prisma/client"

type Props = {
    image: Prisma.ImageCreateInput;
    setImage: Dispatch<SetStateAction<Prisma.ImageCreateInput>>;
    className?: string;
}

export function Avatar({ image, setImage, className, ...props }: Props) {

    const successHandler = (res: any, opts: any) => {
        if (image.publicId !== null) {
            deleteImage(image.publicId)
        }
        setImage({ publicId: res.info?.publicId, url: res.info?.secure_url })
    }

    const removeImage = () => {
        if (image.publicId !== null) {
            deleteImage(image.publicId)
            setImage({ publicId: "", url: "" })
        }
    }

    return (
        <div className=' flex flex-col items-center justify-center gap-10'>
            <div
                className={twMerge(
                    " bg-transparent size-80 relative text-center rounded-full overflow-hidden border-dotted border-2 border-primary text-white p-4",
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
                                    image.publicId ||
                                    process.env.NEXT_PUBLIC_CAMERA_PUB_ID!
                                }
                                alt=''
                                fill={true}
                                className='p-0 size-80 object-cover text-white'
                            />
                        )
                    }}
                </CldUploadWidget>
            </div>
            {image.publicId && <Button className='' onClick={removeImage}>Remove Image</Button>}
        </div>
    )
}
