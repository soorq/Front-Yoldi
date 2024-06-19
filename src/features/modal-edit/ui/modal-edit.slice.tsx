'use client';

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
import { useState } from 'react';

export function ModalEditSlice() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
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

                    <ModalForm isOpen={isOpen} onSwitchOpen={setIsOpen} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
