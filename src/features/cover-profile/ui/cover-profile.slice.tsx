'use client';

import { CoverProfileDelete } from '~&/src/features/cover-profile/ui/cover-profile_delete';
import { CoverProfileAdd } from '~&/src/features/cover-profile/ui/cover-profile_add';
import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function Banner({
    image,
    slug
}: {
    image: IResponseUser['cover'];
    slug: string;
}) {
    const session = useSession();

    return (
        <section className="w-full h-full max-h-[200px] border-b border-input">
            <div className="w-full h-full relative group">
                {image?.url && (
                    <Image
                        alt={`CoverProfile-${image?.id}`}
                        className="object-cover aspect-video"
                        loading="lazy"
                        sizes="100%"
                        src={image?.url}
                        fill
                    />
                )}

                {session?.data?.user?.slug === slug &&
                    session?.data?.role === 'owner' && (
                        <div className="group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center transition-opacity">
                            {image?.url ? (
                                <CoverProfileDelete
                                    slug={session?.data?.user?.slug}
                                    name={session?.data?.user?.name || ''}
                                />
                            ) : (
                                <CoverProfileAdd
                                    slug={session?.data?.user?.slug}
                                    name={session?.data?.user?.name || ''}
                                />
                            )}
                        </div>
                    )}
            </div>
        </section>
    );
}
