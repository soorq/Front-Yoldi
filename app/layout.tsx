import AppProvider from '~&/src/app/providers/app.provider';
import { APP_URL } from '~&/src/shared/lib/enviroments';
import { Toaster } from '~&/src/shared/ui/toaster';
import type { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const _font = Inter({
    subsets: ['latin'],
    variable: '--font-root',
    adjustFontFallback: false
});

export const metadata: Metadata = {
    title: 'YoIDi',
    description: 'Created By Soorq YoIDi',
    alternates: {
        canonical: new URL(APP_URL || '')
    },
    openGraph: {
        type: 'profile',
        title: 'YoIDi',
        description: 'Тестовое задание YoIDi',
        url: new URL(APP_URL || ''),
        locale: 'ru-RU',
        images: {
            type: '',
            alt: 'YoIDi openGraph',
            url: '/meta/og.png'
        }
    },
    twitter: {
        card: 'summary',
        title: 'Персоналкин',
        images: [
            {
                url: '/meta/favicon-32x32.png',
                alt: 'YoIDi'
            }
        ]
    },
    manifest: '/meta/site.webmanifest',
    authors: [{ url: 'https://github.com/soorq', name: 'soorq' }]
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <body className={_font.variable}>
                <AppProvider>{children}</AppProvider>
                <Toaster />
            </body>
        </html>
    );
}
