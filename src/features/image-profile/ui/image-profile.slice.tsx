import { ImageProfileVariants } from '~&/src/features/image-profile/model/image-profile.variants';
import { ImageProfileDelete } from '~&/src/features/image-profile/ui/image-profile_delete';
import { ImageProfileAdd } from '~&/src/features/image-profile/ui/image-profile_add';
import { Avatar, AvatarFallback, AvatarImage } from '~&/src/shared/ui/avatar';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '~&/src/shared/lib/utils';
import { Session } from 'next-auth';

export function ImageProfile({
    size,
    session
}: {
    session: Session | null;
    size: VariantProps<typeof ImageProfileVariants>['size'];
}) {
    const user = session?.user;

    return (
        <Avatar
            className={cn(
                ImageProfileVariants({ size }),
                'relative group z-10'
            )}
        >
            <AvatarImage
                className="object-cover aspect-square w-full"
                src={user?.image?.url || ''}
                alt={`image-profile_{${user?.image?.id}`}
            />
            <AvatarFallback>{user?.name ? user?.name[0] : ''}</AvatarFallback>

            {session?.role === 'owner' && size === 'lg' && (
                <div className="group-hover:absolute group-hover:top-0 group-hover:left-0 w-full h-full flex justify-center items-center">
                    {user?.image?.url ? (
                        <ImageProfileDelete />
                    ) : (
                        <ImageProfileAdd />
                    )}
                </div>
            )}
        </Avatar>
    );
}
