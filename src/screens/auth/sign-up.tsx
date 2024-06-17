'use client';

import { FormSingUp } from '~&/src/features/by-email';
import { FOOTER_DATA } from '~&/src/shared/lib/data';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';
import { usePathname } from 'next/navigation';

export default function SignUp() {
    const path = usePathname();
    const footerData = Object.assign(
        {},
        ...FOOTER_DATA.filter(el => el.id === path)
    );

    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="w-full h-full flex-grow bg-[#f3f3f3]">
                <section className="w-full h-full justify-center items-center flex">
                    <FormSingUp />
                </section>
            </main>
            <Footer
                href={footerData.href}
                text={footerData.text}
                textLink={footerData.textLink}
            />
        </div>
    );
}
