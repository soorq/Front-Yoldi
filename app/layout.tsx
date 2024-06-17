import AppProvider from '~&/src/app/providers/app.provider';
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
    description: 'Created By Soorq YoIDi'
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
