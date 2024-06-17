'use client';

import { FormControl, Form, FormField, FormItem } from '~&/src/shared/ui/form';
import { Card, CardContent, CardHeader } from '~&/src/shared/ui/card';
import { PasswordInput } from '~&/src/shared/ui/password-input';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
    FormSignInSchema,
    type TypeInferSignIn
} from '~&/src/features/by-email/model/signin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { toast } from '~&/src/shared/ui/use-toast';
import { Button } from '~&/src/shared/ui/button';
import { Input } from '~&/src/shared/ui/input';
import { redirect } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import { useEffect } from 'react';

export function FormSingIn() {
    const form = useForm<TypeInferSignIn>({
        resolver: zodResolver(FormSignInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const session = useSession();

    useEffect(() => {
        if (session?.data?.user?.slug) {
            redirect(`/account/${session?.data?.user?.slug}`);
        }
    }, [session?.data]);

    const handler: SubmitHandler<TypeInferSignIn> = async data => {
        try {
            await signIn('credentials', {
                redirect: false,
                ...data
            });

            /**
             * Вызываем toast (Уведомление),
             * чтоб сообщить юзеру об успешном входе
             */
            toast({
                variant: 'default',
                draggable: 'true',
                title: 'Рады вас видеть!'
            });
        } catch (error) {
            /**
             * Тут хард код получается, но мы всегда знаем,
             * что от axios приходит объект, где есть message с ответом.
             */
            const err = error as unknown as { message: string };
            /**
             * Вызываем toast (Уведомление),
             * чтоб сообщить юзеру об ошибке при входе
             */
            toast({
                variant: 'destructive',
                draggable: 'true',
                title: `Попробуйте снова! ${err.message}`
            });
        }
    };

    return (
        <Card className="sm:max-w-[400px] w-full mx-auto sm:h-auto h-full rounded-md py-1">
            <CardHeader className="px-[30px] pb-0 mb-[25px]">
                <h1 className="text-3xl leading-[140%] font-medium tracking-wide">
                    Вход в Yoldi Agency
                </h1>
            </CardHeader>
            <CardContent className="px-[30px]">
                <Form {...form}>
                    <form
                        className="w-full"
                        onSubmit={form.handleSubmit(handler)}
                    >
                        <div className="md:px-[5px] flex flex-col gap-[15px] mb-[25px]">
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex gap-2.5 py-3 border-input border h-auto shadow-sm items-center space-0 rounded-md px-5">
                                        <Mail className="shrink-0" size={20} />
                                        <FormControl>
                                            <Input
                                                className="placeholder:text-base p-0 h-6 placeholder:leading-[25.6px] px-0.5 placeholder:font-normal"
                                                placeholder="E-mail"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex gap-2.5 py-3 border-input border h-auto shadow-sm items-center space-0 rounded-md px-5">
                                        <Lock className="shrink-0" size={20} />
                                        <FormControl>
                                            <PasswordInput
                                                className="placeholder:text-base placeholder:pl-0.5 p-0 h-6 placeholder:leading-[25.6px] w-full px-0.5"
                                                placeholder="Пароль"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={
                                !form.formState.isDirty ||
                                !form.formState.isValid ||
                                form.formState.isSubmitting
                            }
                            type="submit"
                            className="w-full text-base leading-[26px] h-auto py-3"
                        >
                            Войти
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
