import { ImageProfileVariants } from '~&/src/features/image-profile/model/image-profile.variants';
import { ImageProfileDelete } from '~&/src/features/image-profile/ui/image-profile_delete';
import { ImageProfileAdd } from '~&/src/features/image-profile/ui/image-profile_add';
import { Avatar, AvatarFallback, AvatarImage } from '~&/src/shared/ui/avatar';
import type { IResponseUser } from '~&/src/shared/types/User.interface';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '~&/src/shared/lib/utils';
import type { User } from 'next-auth';

export function ImageProfile({
    size,
    user
}: {
    user: IResponseUser | User;
    size: VariantProps<typeof ImageProfileVariants>['size'];
}) {
    return (
        <Avatar className={cn(ImageProfileVariants({ size }))}>
            <AvatarImage
                className="object-cover aspect-square w-full"
                src={user?.image?.url || ''}
                alt={`image-profile_{${user?.image?.id}`}
            />
            <AvatarFallback>{user?.name ? user.name[0] : ''}</AvatarFallback>

            {size === 'lg' && user?.role === 'owner' && (
                <div className="absolute group-hover:top-0 group-hover:left-0 w-full h-full flex justify-center items-center">
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
