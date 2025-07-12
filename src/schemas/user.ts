import { z } from "zod";

export const userSchema = z.object({
    email: z.email({ message: "provide email"}),
    password: z.string({ message: "Provide password" }),
    fullName: z.string({ message: "Provide your full name" }),
});