import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook"
import { prismaClient } from "./utils/prismaClient"
import bcrypt from "bcryptjs"
import { CredentialsSignin } from "@auth/core/errors"
import { Provider } from "@prisma/client"
import { generateUsername } from "./utils/generateUsernames"
import { downloadAndUploadImage } from "./actions/cloudinary.actions"
import axios from "axios"
import { axiosInstance, axiosInstanceNext } from "./utils/axiosInstance"

class InvalidPasswordError extends CredentialsSignin {
    code = "Invalid Password"
}

class NoUserFound extends CredentialsSignin {
    code = "No User Found"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/auth/signin"
    },
    providers: [
        Google,
        GitHub,
        Facebook,
        Credentials({
            credentials: {
                usernameOrEmail: {
                    label: "Username or Email",
                    type: "text",
                    required: true
                },
                password: {
                    label: "Password",
                    type: "password",
                    required: true
                }
            },
            authorize: async (credentials, req) => {
                // console.log(credentials)
                const { usernameOrEmail, password } = credentials
                try {
                    if (
                        typeof usernameOrEmail == "string" &&
                        typeof password == "string"
                    ) {
                        req
                        const response = await prismaClient.user.findFirst({
                            where: {
                                OR: [
                                    { email: usernameOrEmail },
                                    { username: usernameOrEmail }
                                ]
                            }
                        })

                        if (!response) throw new NoUserFound()
                        if (bcrypt.compareSync(password, response.password)) {
                            return {
                                ...response,
                                id: response.id.toString() // Ensure id is a string
                            }
                        } else throw new InvalidPasswordError()
                    }
                    return null
                } catch (error) {
                    console.log(error)
                    return null
                }
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: ({ token }) => {
            // console.log("jwt token: ", token)
            return token
        },

        // If a user signs in with a provider handle that here and if he/she logs in with credentials, allow them
        signIn: async ({ user, account }) => {
            const { email, name, image } = user
            if (!email || !name) return false

            if (account?.provider) {
                const user = await prismaClient.user.findFirst({
                    where: {
                        email,
                        provider: account.provider.toUpperCase() as Provider
                    }
                })

                if (!user) {
                    let profilePic = {
                        url: "",
                        publicId: ""
                    }
                    if (image) {
                        profilePic = await axiosInstanceNext.post(
                            "/api/cloudinary",
                            { url: image }
                        ).then(data => data.data)
                    }
                    await prismaClient.user.create({
                        data: {
                            email,
                            name,
                            username: generateUsername(email),
                            provider:
                                account.provider.toUpperCase() as Provider,
                            profilePic: {
                                create: {
                                    url: image || "",
                                    publicId: profilePic.publicId
                                }
                            }
                        }
                    })
                }
            }

            return true
        }
    }
})
