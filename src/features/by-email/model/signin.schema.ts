import { z } from 'zod';

export const FormSignInSchema = z.object({
    email: z
        .string()
        .email('Не корректный e-mail адресс!')
        .nonempty({ message: 'Это поле обязательно!' }),
    password: z
        .string()
        .min(6, 'Минимум 6 символов!')
        .nonempty({ message: 'Это поле обязательно!' })
});
export type TypeInferSignIn = z.infer<typeof FormSignInSchema>;
