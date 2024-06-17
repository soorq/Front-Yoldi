'use client';

import { SessionProvider } from 'next-auth/react';
import type { PropsWithChildren } from 'react';
import type { Session } from 'next-auth';

export default function NextauthProvider({
    children,
    session
}: PropsWithChildren<{ session: Session | null }>) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
