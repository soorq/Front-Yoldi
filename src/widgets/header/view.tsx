'use client';

import { Avatar, AvatarImage, AvatarFallback } from '~&/src/shared/ui/avatar';
import { Button } from '~&/src/shared/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function Header() {
    const session = useSession();

    return (
        <header className="w-full h-auto py-[14px] px-5 border-b border-input">
            <div className="flex w-full h-full justify-between items-center">
                <div className="flex gap-5 max-w-xs w-full">
                    <a href="/" className="shrink-0 w-fit h-fit">
                        <Image
                            src="/logo/main.png"
                            alt="logo-brand"
                            width={80}
                            height={50}
                            sizes="100%"
                        />
                    </a>

                    <p className="leading-[160%] sm:block hidden text-base font-normal tracking-normal">
                        Разрабатываем и запускаем сложные веб проекты
                    </p>
                </div>

                {session?.data?.user ? (
                    <div className="shrink-0 w-auto flex items-center gap-5">
                        <p className="text-base leading-[160%] font-normal">
                            {session?.data?.user.name}
                        </p>
                        <a href={`/account/${session?.data?.user.slug}`}>
                            <Avatar className="shrink-0 max-h-[50px] max-w-[50px]">
                                <AvatarImage
                                    src={
                                        session?.data?.user?.image
                                            ? session?.data?.user?.image?.url
                                            : ''
                                    }
                                />
                                <AvatarFallback className="text-lg font-normal leading-[160%]">
                                    {session?.data?.user?.name
                                        ? session?.data?.user.name[0]
                                        : ''}
                                </AvatarFallback>
                            </Avatar>
                        </a>
                    </div>
                ) : (
                    <Button
                        className="h-auto py-[7px] leading-[160%] px-[33px] text-base font-medium mr-[9.5px]"
                        variant="outline"
                        asChild
                    >
                        <a href="/login">Войти</a>
                    </Button>
                )}
            </div>
        </header>
    );
}
