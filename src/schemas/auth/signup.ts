import { z } from "zod";

export const signupSchema = z
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