import { z } from 'zod';

export const messageValidation = z.object({
    content: z
    .string()
    .min(10, {message: 'Content must be of 10 characters'})
    .max(300, 'Content must not be more than 300 characters')
})