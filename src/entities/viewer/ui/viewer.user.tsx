'use client';

import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { ImageProfile } from '~&/src/features/image-profile';
import { signOut, useSession } from 'next-auth/react';
import { Skeleton } from '~&/src/shared/ui/skeleton';
import { Button } from '~&/src/shared/ui/button';
import { LogOut } from 'lucide-react';
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

export function ViewerUser({ user }: { user: IResponseUser | null }) {
    const [open, setOpen] = React.useState(false);
    const session = useSession();

    return (
        <section className="w-full h-svh bg-white">
            <div className="max-w-[860px] relative -top-[50px] mx-auto px-[30px] w-full h-full">
                <div className="w-auto h-auto mb-[35px]">
                    <ImageProfile
                        user={user}
                        role={session?.data?.role}
                        size="lg"
                    />
                </div>

                <div className="flex w-full mb-[30px] md:justify-between md:items-baseline flex-col md:flex-row">
                    <div className="flex flex-col gap-2.5">
                        <h2 className="font-medium text-3xl">
                            {user?.name || ''}
                        </h2>

                        <p className="text-base leading-[160%] order-1">
                            {user?.email}
                        </p>
                    </div>

                    {session?.data?.user &&
                        user?.slug === session?.data?.user?.slug &&
                        session?.data?.role === 'owner' && (
                            <ModalEditButton
                                onSwitchOpen={setOpen}
                                isOpen={open}
                            />
                        )}
                </div>

                <div className="max-w-[600px] w-full h-auto">
                    <div className="mb-12">
                        <p className="text-base leading-[160%]">
                            {user?.description || ''}
                        </p>
                    </div>

                    {session?.data?.user &&
                        session?.data?.role === 'owner' &&
                        user?.slug === session?.data?.user?.slug && (
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
