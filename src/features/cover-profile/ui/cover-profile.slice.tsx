import { CoverProfileDelete } from '~&/src/features/cover-profile/ui/cover-profile_delete';
import { CoverProfileAdd } from '~&/src/features/cover-profile/ui/cover-profile_add';
import type { IResponseUser } from '~&/src/shared/types/User.interface';
import type { User } from 'next-auth';
import Image from 'next/image';

export function Banner({ user }: { user: IResponseUser | User }) {
    return (
        <section className="w-full h-full max-h-[200px] border-b bg-background-secondary border-stroke-secondary">
            <div className="w-full h-full relative group">
                {user?.cover && (
                    <Image
                        alt={`CoverProfile-${user.cover.id}`}
                        className="object-cover aspect-video"
                        loading="lazy"
                        sizes="100%"
                        src={user.cover.url}
                        fill
                    />
                )}

                {user && user.role === 'owner' && (
                    <div className="group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center transition-opacity">
                        {user?.cover ? (
                            <CoverProfileDelete />
                        ) : (
                            <CoverProfileAdd />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
