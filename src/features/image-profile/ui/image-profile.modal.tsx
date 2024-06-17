import { Button } from '~&/src/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose
} from '~&/src/shared/ui/dialog';

export function ImageProfileModal({
    isOpen,
    onOpenChange
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm w-full">
                <DialogTitle>
                    Вы действительно готовы обновить превью вашего профиля?
                </DialogTitle>
                <div className="flex md:justify-between md:flex-row gap-2.5 flex-col">
                    <DialogClose asChild className="w-full">
                        <Button type="button"> Отмена</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        className="w-full"
                        form="cover-profile-form"
                        onClick={() => onOpenChange(false)}
                    >
                        Подтвердить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
