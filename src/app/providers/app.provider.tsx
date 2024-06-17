import NextauthProvider from '~&/src/app/providers/nextauth.provider';
import SwrProvider from '~&/src/app/providers/swr.provider';
import type { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import NextTopLoader from 'nextjs-toploader';

export default async function AppProvider({ children }: PropsWithChildren) {
    const session = await getServerSession();

    return (
        <NextauthProvider session={session}>
            <SwrProvider>{children}</SwrProvider>
            <NextTopLoader color="#000000" height={2.5} showSpinner={false} />
        </NextauthProvider>
    );
}
