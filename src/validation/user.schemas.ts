import { z } from "zod";

export const  userToCreateDTO =  z.object( {
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string()
});

export const  userDTO = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const  updateUserDTO = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
});