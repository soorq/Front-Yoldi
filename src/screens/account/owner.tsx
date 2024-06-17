'use client';

import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { fetcher } from '~&/src/shared/api/fetcher.api';
import { API_URL } from '~&/src/shared/lib/enviroments';
import { Skeleton } from '~&/src/shared/ui/skeleton';
import { Header } from '~&/src/widgets/header';
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
    const { data: user } = useSWR<IResponseUser>(
        `${API_URL}/user/${slug}`,
        fetcher,
        {
            revalidateOnMount: true,
            revalidateOnFocus: true,
            refreshInterval: 5 * 60 * 60 * 60
        }
    );

    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="w-full h-full flex-grow bg-[#f3f3f3]">
                <Banner slug={slug} image={user?.cover ? user.cover : null} />
                <ViewerUser user={user ?? null} />
            </main>
        </div>
    );
}
