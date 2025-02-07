"use client"

import { signupUser } from "@/actions/user.actions"
import { Avatar, FormField } from "@/components"
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { useAppDispatch } from "@/libs/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { setError as setErrorState } from "@/libs/features/Errors/errorSlice"
import { useState } from "react"
import { signupSchema } from "@/schemas/auth/signup"
import { Prisma } from "@prisma/client"

export default function Signup() {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const [image, setImage] = useState<Prisma.ImageCreateInput>({
        publicId: "",
        url: ""
    })

    const {
        handleSubmit,
        register,
        formState: { errors, isValid, isSubmitting },
        setError
    } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        mode: "onChange"
    })

    const submit = async (data: z.infer<typeof signupSchema>) => {
        // console.log(data)
        if(data.confirmPassword !== data.password) {
            setError("confirmPassword", {message: "Password and confirm password does not match!"})
            return
        }
        const response = await signupUser({...data, image})
        if(response.success) router.push("/")
        else dispatch(setErrorState("Server error!"))
    }

    return (
        <Container className="flex flex-col items-center justify-center gap-10 mb-20">
            <h1 className="text-4xl font-medium">Welcome to <span className="text-5xl font-bold text-primary">Algo Arena!</span></h1>
            <form onSubmit={handleSubmit(submit)} className='flex items-center justify-center gap-20 w-full h-full'>
                <Avatar image={image} setImage={setImage} className='' />
                <div className="w-fit flex flex-col items-center justify-center gap-8">
                    <FormField
                        name='name'
                        register={register}
                        label='Name'
                        fieldError={errors.name}
                        placeHolder="John Smith"
                        className="w-full"
                    />

                    <div className="w-full flex items-center justify-center gap-2">
                    <FormField
                        name='email'
                        register={register}
                        label='Email'
                        fieldError={errors.email}
                        placeHolder="john123@example.com"
                    />

                    <FormField
                        name='username'
                        register={register}
                        label='Username'
                        fieldError={errors.username}
                        placeHolder="john123"
                    />
                    </div>

                    <div className="w-full flex items-center justify-center gap-2">
                    <FormField
                        name='password'
                        register={register}
                        type='password'
                        label='Password'
                        fieldError={errors.password}
                        placeHolder="8+ Characters"
                    />

                    <FormField
                        name='confirmPassword'
                        register={register}
                        label='Confirm Password'
                        fieldError={errors.confirmPassword}
                        placeHolder="8+ Characters"
                        type="password"
                    />
                    </div>

                    <Button type='submit' disabled={isSubmitting || !isValid} loading={isSubmitting}>Sign Up</Button>
                </div>
            </form>
        </Container>
    )
}
