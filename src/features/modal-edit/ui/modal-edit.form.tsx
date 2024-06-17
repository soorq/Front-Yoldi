'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUser } from '~&/src/features/modal-edit/api';
import {
    SchemaModalForm,
    type TypeInferSchemaModalForm
} from '~&/src/features/modal-edit/model/schema.form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '~&/src/shared/ui/textarea';
import { Input } from '~&/src/shared/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';
import { toast } from '~&/src/shared/ui/use-toast';
import { useSession } from 'next-auth/react';

export function ModalForm({
    btnClose,
    btnSubmit
}: {
    btnClose: React.ReactNode;
    btnSubmit: React.ReactNode;
}) {
    const session = useSession();

    const form = useForm<TypeInferSchemaModalForm>({
        resolver: zodResolver(SchemaModalForm),
        defaultValues: {
            url: session?.data?.user?.slug || '',
            name: session?.data?.user?.name || '',
            description: session?.data?.user?.description || ''
        }
    });

    const handler: SubmitHandler<TypeInferSchemaModalForm> = async data => {
        try {
            await UpdateUser({
                slug: session?.data?.user?.slug || '',
                ...data
            });
            await session?.update();
            toast({
                title: 'Успешно обновлено'
            });
        } catch (e) {
            const err = e as { message: string };
            toast({
                title: 'Ошибка!',
                description: err.message
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handler)}>
                <div className="flex flex-col gap-[15px] mb-[25px]">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-[5px] text-muted-foreground leading-[160%]">
                                    Имя
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-3 px-5 border border-input rounded-md text-base h-auto"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="url"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-[5px] text-muted-foreground leading-[160%]">
                                    Адрес профиля
                                </FormLabel>
                                <FormControl>
                                    <div className="border border-input rounded-md flex text-base">
                                        <p className="py-3 px-5 border-r rounded-l-md border-input bg-muted text-muted-foreground">
                                            example.com/
                                        </p>
                                        <Input
                                            {...field}
                                            className="h-auto py-0 px-5"
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-[5px] text-muted-foreground leading-[160%]">
                                    Описание
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="px-5 py-3 focus-visible:outline-0 min-h-32"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-2.5 items-center">
                    {btnClose}
                    {btnSubmit}
                </div>
            </form>
        </Form>
    );
}
