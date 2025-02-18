"use client"

import { checkUser } from "@/actions/user.actions"
import { Button, Container, FormField } from "@/components"
import { Separator } from "@/components/Separator"
import { setError } from "@/libs/features/Errors/notificationSlice"
import { useAppDispatch } from "@/libs/hooks"
import { signinSchema } from "@/schemas/auth/signin"
import { DEFAULT_LOGIN_REDIRECT } from "@/utils/constants"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa6"
import { z } from "zod"

export default function Signin() {
    const { register, handleSubmit, formState: { isSubmitting, isValid } } = useForm<z.infer<typeof signinSchema>>({
        defaultValues: {
            usernameOrEmail: "",
            password: ""
        },
        mode: "onChange"
    })
    const [showPass, setShowPass] = useState(false)
    const dispatch = useAppDispatch()

    const onSubmit = async (data: z.infer<typeof signinSchema>) => {
        console.log("data: ", data)
        const isUserSignedUp = await checkUser(data.usernameOrEmail)
        if (isUserSignedUp.data)
            signIn("credentials", {
                redirectTo: DEFAULT_LOGIN_REDIRECT,
                ...data
            })
        else dispatch(setError("No user found. Please signup!"))
    }

    return (
        <Container className='flex flex-col items-center justify-center gap-4'>
            <div className='w-[30%] flex items-center justify-center'>
                <Image
                    src={"/logo.svg"}
                    width={300}
                    height={50}
                    alt='Algo Arena'
                />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center justify-start gap-3 w-[20%]'
            >
                <FormField
                    register={register}
                    name='usernameOrEmail'
                    label='Username or Email'
                    placeHolder='john123@example.com'
                    className='w-full'
                />
                <FormField
                    register={register}
                    name='password'
                    label='Password'
                    className='w-full'
                    placeHolder='8+ Character'
                    type={showPass ? "text" : "password"}
                />
                <div className='w-full flex items-center justify-start gap-1 cursor-pointer'>
                    <input
                        type='checkbox'
                        onChange={() => setShowPass(!showPass)}
                        checked={showPass}
                        id='cb'
                    />
                    <label htmlFor='cb' className='font-itim'>
                        Show Password
                    </label>
                </div>
                <div className="w-full">
                <span className="w-full hover:underline cursor-pointer block">Forgot Password?</span>
                <span className="w-full hover:underline cursor-pointer">New user? Signup here...</span>
                </div>
                <Button className='w-full' type="submit" disabled={isSubmitting || !isValid} loading={isSubmitting}>Sign In</Button>
                <Separator text='Or' />
                <div className='w-full flex items-center justify-around gap-4 text-2xl'>
                    <FaGoogle
                        className='rounded p-2 size-10 bg-blue-500 cursor-pointer hover:bg-opacity-50 transition-colors'
                        onClick={() =>
                            signIn("google", {
                                redirectTo: DEFAULT_LOGIN_REDIRECT
                            })
                        }
                    />
                    <FaFacebook
                        className='p-2 rounded size-10 bg-[#3d5098] cursor-pointer hover:bg-opacity-50 transition-colors'
                        onClick={() =>
                            signIn("facebook", {
                                redirectTo: DEFAULT_LOGIN_REDIRECT
                            })
                        }
                    />
                    <FaGithub
                        className='p-2 rounded size-10 bg-[#363636] cursor-pointer hover:bg-opacity-50 transition-colors'
                        onClick={() =>
                            signIn("github", {
                                redirectTo: DEFAULT_LOGIN_REDIRECT
                            })
                        }
                    />
                </div>
            </form>
        </Container>
    )
}
