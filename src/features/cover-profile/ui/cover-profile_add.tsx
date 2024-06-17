import {
    CoverProfileSchema,
    type TypeInferCoverSchema
} from '~&/src/features/cover-profile/model/cover-profile.schema';
import { Form, FormField, FormItem, FormLabel } from '~&/src/shared/ui/form';
import { UpdateCoverProfile } from '~&/src/features/cover-profile/api';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '~&/src/shared/ui/use-toast';
import { Input } from '~&/src/shared/ui/input';
import { Image, Upload } from 'lucide-react';
import type { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const CoverProfileModal = dynamic(
    () =>
        import('~&/src/features/cover-profile/ui/cover-profile.modal').then(
            cn => cn.CoverProfileModal
        ),
    {
        ssr: false
    }
);

export function CoverProfileAdd({
    slug,
    name
}: {
    name: string;
    slug: string;
}) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const form = useForm<TypeInferCoverSchema>({
        resolver: zodResolver(CoverProfileSchema),
        defaultValues: {
            file: null
        }
    });

    const handlerSwitch = () => setIsOpenModal(prev => !prev);

    const handler: SubmitHandler<TypeInferCoverSchema> = async data => {
        try {
            await UpdateCoverProfile(data?.file, name, slug);

            toast({
                variant: 'default',
                title: 'Успешно обновлено!',
                description: 'Ваше превью профиля успешно обновлено!'
            });
        } catch (e) {
            const err: AxiosError = e as unknown as AxiosError;
            toast({
                variant: 'destructive',
                title: 'Ошибка!',
                description: err.message
            });
        } finally {
            form.reset();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handler)} id="cover-profile-form">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center border border-input bg-white py-[7px] px-[22px] relative gap-2.5 rounded-md">
                                <Upload size={18} />
                                <FormLabel className="font-medium leading-[160%] text-base">
                                    Загрузить
                                </FormLabel>
                                <Input
                                    className="z-10 cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium  top-0 left-0 opacity-0 absolute w-full"
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
                                <Image size={20} />
                            </div>
                        </FormItem>
                    )}
                />

                <CoverProfileModal
                    isOpen={isOpenModal}
                    onOpenChange={handlerSwitch}
                />
            </form>
        </Form>
    );
}
