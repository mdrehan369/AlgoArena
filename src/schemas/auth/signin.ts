import { z } from "zod";

export const signinSchema = z.object({
    usernameOrEmail: z.string().min(1, "Username or Email is required!"),
    password: z.string().min(1, "Password is required!")
})