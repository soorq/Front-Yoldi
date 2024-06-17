'use client';

import {
    type TypeInferImageSchema,
    ImageProfileSchema
} from '~&/src/features/image-profile/model/image-profile.schema';
import { Form, FormField, FormItem, FormMessage } from '~&/src/shared/ui/form';
import { UpdateImageProfile } from '~&/src/features/image-profile/api';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '~&/src/shared/ui/use-toast';
import { Input } from '~&/src/shared/ui/input';
import { useSession } from 'next-auth/react';
import type { AxiosError } from 'axios';
import { Camera } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ImageProfileModal = dynamic(
    () =>
        import('~&/src/features/image-profile/ui/image-profile.modal').then(
            cn => cn.ImageProfileModal
        ),
    {
        ssr: false
    }
);

export function ImageProfileAdd() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const session = useSession();

    const form = useForm<TypeInferImageSchema>({
        resolver: zodResolver(ImageProfileSchema),
        defaultValues: {
            file: null
        }
    });

    const handler: SubmitHandler<TypeInferImageSchema> = async data => {
        try {
            console.log(form.formState.errors);
            await UpdateImageProfile({
                name: session?.data?.user?.name || '',
                slug: session?.data?.user?.slug || '',
                file: data?.file
            });

            toast({
                variant: 'default',
                title: 'Успешно обновлено!',
                description: 'Ваше превью профиля успешно обновлено!'
            });
        } catch (e) {
            console.log(e);
            const err: AxiosError = e as unknown as AxiosError;
            toast({
                variant: 'destructive',
                title: 'Ошибка!',
                description: err.message || form.formState.errors.file?.message
            });
        } finally {
            await session.update();
            form.reset();
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handler)}
                id="image-profile-form"
                className="w-full h-full"
            >
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem className="relative gap-2.5 rounded-full overflow-hidden w-full h-full">
                            <div className="flex items-center justify-center backdrop-blur w-full h-full group-hover:opacity-100 opacity-0 transition-opacity">
                                <Camera size={30} />
                                <Input
                                    className="z-10 cursor-pointer top-0 left-0 opacity-0 absolute w-full h-full"
                                    type="file"
                                    onChange={e => {
                                        setIsOpenModal(true);
                                        field.onChange(
                                            e?.target?.files
                                                ? e.target.files[0]
                                                : null
                                        );
                                    }}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <ImageProfileModal
                    isOpen={isOpenModal}
                    onOpenChange={setIsOpenModal}
                />
            </form>
        </Form>
    );
}
