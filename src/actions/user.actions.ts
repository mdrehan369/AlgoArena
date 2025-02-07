"use server"

import { CreateUserPayload } from "@/types/user.types"
import { prismaClient } from "@/utils/prismaClient"

export const checkUser = async (usernameOrEmail: string) => {
    try {
        const response = await prismaClient.user.findFirst({
            where: {
                AND: [
                    {
                        OR: [
                            { email: usernameOrEmail },
                            { username: usernameOrEmail }
                        ]
                    },
                    { provider: "CREDENTIALS" }
                ]
            }
        })
        console.log("response: ", response)
        if (response) return { success: true, data: true }
        else return { success: true, data: false }
    } catch (error) {
        // console.log(error)
        return { success: false }
    }
}

export const signupUser = async ({ name, email, username, password, image }: CreateUserPayload) => {
    try {
        await prismaClient.user.create({
            data: {
                email,
                username,
                password,
                name,
                profilePic: {
                    create: {
                        ...image
                    }
                }
            }
        })
        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}