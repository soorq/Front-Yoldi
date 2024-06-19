'use client';

import { useDeleteImage } from '~&/src/features/image-profile/api';
import { toast } from '~&/src/shared/ui/use-toast';
import { Button } from '~&/src/shared/ui/button';
import { useSession } from 'next-auth/react';
import { Trash } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
    DialogTrigger
} from '~&/src/shared/ui/dialog';
import { useState } from 'react';

export function ImageProfileDelete() {
    const [open, setOpen] = useState(false);
    const { trigger, data, error } = useDeleteImage();
    const session = useSession();

    const handler = async () => {
        try {
            await trigger();

            toast({
                variant: 'default',
                title: 'Успешно обновлено!',
                description: 'Ваше превью профиля успешно обновлено!'
            });
            await session.update({ ...data });
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Ошибка!',
                description: error.message
            });
        } finally {
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="gap-2.5 rounded-full overflow-hidden w-full h-full">
                <div className="flex items-center justify-center backdrop-blur w-full h-full group-hover:opacity-100 opacity-0 transition-opacity">
                    <Trash size={18} />
                </div>
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
