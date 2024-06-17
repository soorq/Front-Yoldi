import { ModalForm } from '~&/src/features/modal-edit/ui/modal-edit.form';
import { Button } from '~&/src/shared/ui/button';
import { Pencil } from 'lucide-react';
import {
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    Dialog
} from '~&/src/shared/ui/dialog';

export function ModalEditSlice({
    isOpen,
    onSwitchOpen
}: {
    isOpen: boolean;
    onSwitchOpen: (open: boolean) => void;
}) {
    return (
        <Dialog onOpenChange={onSwitchOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    className="gap-2.5 px-[22px] py-[7px] text-base leading-[160%] w-fit font-medium"
                    variant="outline"
                >
                    <Pencil size={19} />
                    Редактировать
                </Button>
            </DialogTrigger>
            <DialogContent className="p-[30px] max-w-[600px] w-full">
                <DialogHeader>
                    <DialogTitle className="text-3xl md:leading-[250%] text-left leading-normal mb-[25px]">
                        Редактировать профиль
                    </DialogTitle>
                    <ModalForm
                        btnSubmit={
                            <Button
                                onClick={() => onSwitchOpen(!isOpen)}
                                type="submit"
                                className="py-3 text-base leading-[160%] h-auto font-normal w-full"
                            >
                                Сохранить
                            </Button>
                        }
                        btnClose={
                            <Button
                                onClick={() => onSwitchOpen(!isOpen)}
                                type="button"
                                variant="outline"
                                className="py-3 text-base leading-[160%] h-auto font-normal w-full"
                            >
                                Отмена
                            </Button>
                        }
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
