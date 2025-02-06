"use client"

import { Avatar, FormField } from "@/components"
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z
    .object({
        name: z.string().min(1, "Name is required!"),
        email: z
            .string()
            .min(1, "Email is required!")
            .email("Invalid email address"),
        username: z.string().toLowerCase().min(1, "Username is required!"),
        password: z.string().min(4, "Password should be atleast 4 characters!"),
        confirmPassword: z
            .string()
            .min(4, "Password should be atleast 4 characters!")
    })
    .refine((val) => val.confirmPassword == val.password)

export default function Signup() {

    const [url, setUrl] = useState()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const submit = (data: z.infer<typeof schema>) => {
        console.log(data)
    }

    return (
        <Container className="flex flex-col items-center justify-center gap-10 mb-20">
            <h1 className="text-4xl font-medium">Welcome to <span className="text-5xl font-bold text-primary">Algo Arena!</span></h1>
            <form onSubmit={handleSubmit(submit)} className='flex items-center justify-center gap-20 w-full h-full'>
                <Avatar url={null} className='' />
                <div className="w-fit flex flex-col items-center justify-center gap-8">
                    <FormField
                        name='name'
                        register={register}
                        label='Name'
                        fieldError={errors.name}
                        placeHolder="Name"
                        className="w-full"
                    />

                    <div className="w-full flex items-center justify-center gap-2">
                    <FormField
                        name='email'
                        register={register}
                        label='Email'
                        fieldError={errors.email}
                        placeHolder="Email"
                    />

                    <FormField
                        name='username'
                        register={register}
                        label='Username'
                        fieldError={errors.username}
                        placeHolder="Username"
                    />
                    </div>

                    <div className="w-full flex items-center justify-center gap-2">
                    <FormField
                        name='password'
                        register={register}
                        type='password'
                        label='Password'
                        fieldError={errors.password}
                        placeHolder="Password"
                    />

                    <FormField
                        name='confirmPassword'
                        register={register}
                        label='Confirm Password'
                        fieldError={errors.confirmPassword}
                        placeHolder="Confirm Password"
                        type="password"
                    />
                    </div>

                    <Button type='submit'>Sign Up</Button>
                </div>
            </form>
        </Container>
    )
}
