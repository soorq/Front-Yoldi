'use client';

import { FOOTER_DATA } from '~&/src/shared/lib/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Footer() {
    const path = usePathname();
    const data = Object.assign(
        {},
        ...FOOTER_DATA.filter(el => el.id === path.slice(0, -1))
    );

    return (
        <footer className="w-full h-auto border-t border-input bg-white">
            <div className="max-w-fit mx-auto py-[23px] flex gap-2.5">
                <p className="text-base leading-[160%] text-muted-foreground tracking-wide">
                    {data.text}
                </p>
                <Link
                    href={data.href}
                    className="text-base leading-[160%] font-medium tracking-wide"
                >
                    <span className="">{data.textLink}</span>
                </Link>
            </div>
        </footer>
    );
}
