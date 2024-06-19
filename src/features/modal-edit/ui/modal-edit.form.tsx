'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUser } from '~&/src/features/modal-edit/api';
import {
    SchemaModalForm,
    type TypeInferSchemaModalForm
} from '~&/src/features/modal-edit/model/schema.form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '~&/src/shared/ui/textarea';
import { toast } from '~&/src/shared/ui/use-toast';
import { Input } from '~&/src/shared/ui/input';
import { useSession } from 'next-auth/react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';
import { Button } from '~&/src/shared/ui/button';

export function ModalForm({
    isOpen,
    onSwitchOpen
}: {
    isOpen: boolean;
    onSwitchOpen: (open: boolean) => void;
}) {
    const { data: updated, trigger, error } = useUpdateUser();
    const session = useSession();

    const form = useForm<TypeInferSchemaModalForm>({
        resolver: zodResolver(SchemaModalForm),
        defaultValues: {
            url: session?.data?.user.slug || '',
            name: session?.data?.user.name || '',
            description: session?.data?.user.description || ''
        }
    });

    const handler: SubmitHandler<TypeInferSchemaModalForm> = async data => {
        try {
            await trigger({
                dto: { ...data, slug: data.url }
            });

            await session?.update({ user: { ...updated } });

            toast({
                title: 'Успешно обновлено'
            });
        } catch (e) {
            toast({
                title: 'Ошибка!',
                description: error.message
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
                            <FormItem className="w-full h-auto">
                                <FormLabel className="mb-[5px] text-muted-foreground leading-[160%] text-left block">
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
                            <FormItem className="w-full h-auto">
                                <FormLabel className="mb-[5px] text-muted-foreground leading-[160%] text-left w-full block">
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
                            <FormItem className="w-full h-auto">
                                <FormLabel className="mb-[5px] text-muted-foreground leading-[160%] text-left block">
                                    Описание
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="px-5 py-3 focus-visible:outline-0 md:min-h-[150px] min-h-[225px]"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-2.5 items-center">
                    <Button
                        type="submit"
                        onClick={() => onSwitchOpen(!isOpen)}
                        className="py-3 text-base leading-[160%] h-auto font-normal w-full"
                    >
                        Сохранить
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onSwitchOpen(!isOpen)}
                        className="py-3 text-base leading-[160%] h-auto font-normal w-full"
                    >
                        Отмена
                    </Button>
                </div>
            </form>
        </Form>
    );
}
