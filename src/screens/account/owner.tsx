'use client';

import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { fetcher } from '~&/src/shared/api/fetcher.api';
import { API_URL } from '~&/src/shared/lib/enviroments';
import { Skeleton } from '~&/src/shared/ui/skeleton';
import { Header } from '~&/src/widgets/header';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import React from 'react';
import useSWR from 'swr';

const Banner = dynamic(
    () => import('~&/src/features/cover-profile').then(cn => cn.Banner),
    {
        loading: () => (
            <Skeleton className="w-full max-h-[200px] h-full bg-primary rounded-none" />
        ),
        ssr: false
    }
);

const ViewerUser = dynamic(
    () => import('~&/src/entities/viewer').then(cn => cn.ViewerUser),
    { ssr: false }
);

export default function Owner({ slug }: { slug: string }) {
    const session = useSession().data;
    const { data: user } = useSWR<IResponseUser>(
        session?.user ? null : `${API_URL}/user/${slug}`,
        fetcher,
        {
            refreshInterval: 10 * 60 * 60 * 60
        }
    );

    const currentUser = session?.user ? session.user : (user as IResponseUser);

    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="w-full h-full flex-grow bg-[#f3f3f3]">
                <Banner user={currentUser} />
                <ViewerUser user={currentUser} />
            </main>
        </div>
    );
}
