'use client';

import { Card, CardContent, CardHeader } from '~&/src/shared/ui/card';
import { PasswordInput } from '~&/src/shared/ui/password-input';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
    FormSignUpSchema,
    type TypeInferSignUp
} from '~&/src/features/by-email/model/signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '~&/src/shared/ui/use-toast';
import { Button } from '~&/src/shared/ui/button';
import { signUp } from '~&/src/app/api/auth.api';
import { Lock, Mail, User } from 'lucide-react';
import { Input } from '~&/src/shared/ui/input';
import { useRouter } from 'next/navigation';
import {
    FormControl,
    Form,
    FormField,
    FormItem,
    FormMessage
} from '~&/src/shared/ui/form';

export function FormSingUp() {
    const router = useRouter();
    const form = useForm<TypeInferSignUp>({
        resolver: zodResolver(FormSignUpSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            name: '',
            password: ''
        }
    });

    const handler: SubmitHandler<TypeInferSignUp> = async data => {
        try {
            const res = await signUp(data);
            if (res.message) throw new Error(res.message);
            router.push('/login');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: `Попробуйте снова! ${error}`
            });
        }
    };

    return (
        <Card className="sm:max-w-[400px] w-full mx-auto sm:h-auto h-full rounded-md py-1">
            <CardHeader className="px-[30px] pb-0 mb-[25px]">
                <h1 className="text-3xl leading-[140%] font-medium">
                    <span className="tracking-wider">Регистрация</span>
                    <br />в Yoldi Agency
                </h1>
            </CardHeader>
            <CardContent className="px-[30px]">
                <Form {...form}>
                    <form
                        className="w-full"
                        onSubmit={form.handleSubmit(handler)}
                    >
                        <div className="px-[5px] flex flex-col gap-[15px] mb-[25px]">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="w-full h-auto">
                                        <FormItem className="flex gap-2.5 py-3 border-input border h-auto shadow-sm items-center space-0 rounded-md px-5">
                                            <User
                                                className="shrink-0"
                                                size={20}
                                            />
                                            <FormControl>
                                                <Input
                                                    className="placeholder:text-base p-0 h-6 placeholder:leading-[25.6px] px-0.5 placeholder:font-normal"
                                                    placeholder="Имя"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="w-full h-auto">
                                        <FormItem className="flex gap-2.5 py-3 border-input border h-auto shadow-sm items-center space-0 rounded-md px-5">
                                            <Mail
                                                className="shrink-0"
                                                size={20}
                                            />
                                            <FormControl>
                                                <Input
                                                    className="placeholder:text-base p-0 h-6 placeholder:leading-[25.6px] px-0.5 placeholder:font-normal"
                                                    placeholder="E-mail"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="w-full h-auto">
                                        <FormItem className="flex gap-2.5 py-3 border-input border h-auto shadow-sm items-center space-0 rounded-md px-5">
                                            <Lock
                                                className="shrink-0"
                                                size={20}
                                            />
                                            <FormControl>
                                                <PasswordInput
                                                    className="placeholder:text-base placeholder:pl-0.5 p-0 h-6 placeholder:leading-[25.6px] w-full px-0.5"
                                                    placeholder="Пароль"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                        <FormMessage />
                                    </div>
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
                            Создать аккаунт
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
