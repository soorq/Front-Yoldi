'use client';

import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { ImageProfile } from '~&/src/features/image-profile';
import { Button } from '~&/src/shared/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
    const session = useSession();

    return (
        <header className="w-full h-auto py-[14px] px-5 border-b border-input">
            <div className="flex w-auto h-full justify-between items-center">
                <div className="flex gap-5 max-w-xs w-fit">
                    <Link href="/" className="shrink-0 w-fit h-fit">
                        <Image
                            src="/logo/main.png"
                            alt="logo-brand"
                            loading="eager"
                            rel="preload"
                            sizes="100%"
                            height={50}
                            width={80}
                        />
                    </Link>

                    <p className="leading-[160%] sm:block hidden text-base font-normal tracking-normal">
                        Разрабатываем и запускаем сложные веб проекты
                    </p>
                </div>

                {session.data?.user ? (
                    <div className="flex items-center gap-5 shrink-0">
                        <p className="text-base w-auto leading-[160%] font-normal">
                            {session.data.user.name}
                        </p>
                        <Link
                            href={`/account/${session.data.user.slug}`}
                            className="w-full h-full"
                        >
                            <ImageProfile
                                user={session.data.user as IResponseUser}
                                size="sm"
                            />
                        </Link>
                    </div>
                ) : (
                    <Button
                        className="h-auto py-[7px] leading-[160%] px-[33px] text-base font-medium mr-[9.5px]"
                        variant="outline"
                        asChild
                    >
                        <Link href="/login">Войти</Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
