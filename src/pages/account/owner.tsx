'use client';

import { Banner } from '~&/src/features/cover-profile/ui/cover-profile.slice';
import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { fetcher } from '~&/src/shared/api/fetcher.api';
import { API_URL } from '~&/src/shared/lib/enviroments';
import { ViewerUser } from '~&/src/entities/viewer';
import { Header } from '~&/src/widgets/header';
import React from 'react';
import useSWR from 'swr';

export default function Owner({ slug }: { slug: string }) {
    const { data: user } = useSWR<IResponseUser>(
        `${API_URL}}/user/${slug}`,
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
