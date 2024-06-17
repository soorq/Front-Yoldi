'use client';

import type { IUser } from '~&/src/shared/types/User.interface';
import { fetcher } from '~&/src/shared/api/fetcher.api';
import { API_URL } from '~&/src/shared/lib/enviroments';
import { ListUsers } from '~&/src/widgets/list-users';
import { Header } from '~&/src/widgets/header';
import useSWR from 'swr';

export default function RootPage() {
    const { data, error, isLoading } = useSWR<IUser[] | null>(
        `${API_URL}/user`,
        fetcher
    );

    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="w-full h-full">
                <ListUsers data={data ?? null} isLoading={isLoading} />
            </main>
        </div>
    );
}
