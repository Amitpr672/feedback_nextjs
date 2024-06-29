import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be of length 2")
    .max(20, "Username cannot be more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characeter")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email"}),
    password: z.string().min(6, {message: "Password must be of 6 characters"})
})