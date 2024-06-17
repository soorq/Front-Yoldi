import { z } from 'zod';

export const FormSignInSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty()
});
export type TypeInferSignIn = z.infer<typeof FormSignInSchema>;
