import { z } from 'zod';

export const FormSignUpSchema = z.object({
    email: z.string().email().nonempty(),
    name: z.string().nonempty(),
    password: z.string().nonempty()
});

export type TypeInferSignUp = z.infer<typeof FormSignUpSchema>;
