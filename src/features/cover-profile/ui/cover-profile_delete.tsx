import { DeleteCoverProfile } from '~&/src/features/cover-profile/api';
import { toast } from '~&/src/shared/ui/use-toast';
import { Button } from '~&/src/shared/ui/button';
import { Image, Trash } from 'lucide-react';
import type { AxiosError } from 'axios';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
    DialogTrigger
} from '~&/src/shared/ui/dialog';
import { useState } from 'react';

export function CoverProfileDelete({
    name,
    slug
}: {
    name: string;
    slug: string;
}) {
    const [open, setOpen] = useState(false);

    const handler = async () => {
        try {
            await DeleteCoverProfile(name, slug);
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
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                asChild
                className="flex items-center border border-input bg-white py-[7px] px-[22px] relative gap-2.5 rounded-md"
            >
                <Button
                    className="font-medium leading-[160%] text-base h-auto border-none shadow-none"
                    variant="secondary"
                >
                    <Trash size={18} />
                    Удалить
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
