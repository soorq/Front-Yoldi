'use client';
import { useDeleteCover } from '~&/src/features/cover-profile/api';
import { toast } from '~&/src/shared/ui/use-toast';
import { Button } from '~&/src/shared/ui/button';
import { Image, Trash } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
    DialogTrigger
} from '~&/src/shared/ui/dialog';
import { useState } from 'react';

export function CoverProfileDelete() {
    const [open, setOpen] = useState(false);
    const { error, trigger, data } = useDeleteCover();

    const handler = async () => {
        try {
            await trigger();
            toast({
                variant: 'default',
                title: 'Успешно обновлено!',
                description: 'Ваше превью профиля успешно обновлено!'
            });
            setOpen(false);
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Ошибка!',
                description: error.message
            });
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                asChild
                className="flex items-center border border-input bg-white py-[7px] px-[22px] relative gap-2.5 rounded-md"
            >
                <Button className="font-medium leading-[160%] text-base h-auto border-none shadow-none">
                    <Trash size={18} />
                    Удалить
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm w-full">
                <DialogTitle>
                    Вы действительно хотите удалить превью вашего профиля?
                </DialogTitle>
                <div className="flex flex-col md:flex-row gap-2.5 md:justify-between">
                    <DialogClose asChild className="w-full">
                        <Button type="button"> Отмена</Button>
                    </DialogClose>
                    <Button onClick={() => handler()} className="w-full">
                        Подтвердить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
