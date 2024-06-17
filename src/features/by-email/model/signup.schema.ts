import { z } from 'zod';

export const FormSignUpSchema = z.object({
    email: z
        .string()
        .email('Не корректный e-mail адресс!')
        .nonempty('Это поле обязательное!'),
    name: z
        .string()
        .min(2, 'Минимальное кол-во 2!')
        .nonempty('Это поле обязательное!'),
    password: z
        .string()
        .min(8, 'Минимальный пароль - 8 символов!')
        .nonempty('Это поле обязательное!')
});

export type TypeInferSignUp = z.infer<typeof FormSignUpSchema>;
