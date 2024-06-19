import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { ImageProfile } from '~&/src/features/image-profile';
import { signOut } from 'next-auth/react';
import { Skeleton } from '~&/src/shared/ui/skeleton';
import { Button } from '~&/src/shared/ui/button';
import { LogOut } from 'lucide-react';
import type { User } from 'next-auth';
import dynamic from 'next/dynamic';
import React from 'react';

const ModalEditButton = dynamic(
    () =>
        import('~&/src/features/modal-edit/index').then(
            cn => cn.ModalEditSlice
        ),
    {
        loading: () => <Skeleton className="w-full h-full" />,
        ssr: false
    }
);

export function ViewerUser({ user }: { user: IResponseUser | User }) {
    return (
        <section className="w-full h-[79svh] bg-white">
            <div className="max-w-[860px] relative -top-[50px] mx-auto px-[30px] w-full h-full">
                <div className="w-auto h-auto mb-[35px]">
                    <ImageProfile user={user} size="lg" />
                </div>

                <div className="flex w-full mb-[30px] md:justify-between md:items-baseline flex-col md:flex-row">
                    <div className="flex flex-col gap-2.5 mb-2.5">
                        <h2 className="font-medium text-3xl">
                            {user?.name || ''}
                        </h2>

                        <p className="text-base leading-[160%] order-1">
                            {user?.email}
                        </p>
                    </div>

                    {user && user?.role === 'owner' && <ModalEditButton />}
                </div>

                <div className="max-w-[600px] w-full h-auto">
                    <div className="mb-[60px]">
                        <p className="text-base leading-[160%]">
                            {user?.description || ''}
                        </p>
                    </div>

                    {user && user?.role === 'owner' && (
                        <Button
                            className="text-base leading-[160%] py-[7px] gap-2.5 px-[22px]"
                            variant={'outline'}
                            onClick={() => signOut()}
                        >
                            <LogOut size={18} />
                            Выйти
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}
