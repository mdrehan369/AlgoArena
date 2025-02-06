"use server"

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
