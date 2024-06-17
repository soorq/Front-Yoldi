'use client';

import { Skeleton } from '~&/src/shared/ui/skeleton';
import Image, { type ImageProps } from 'next/image';
import { cn } from '~&/src/shared/lib/utils';
import { type FC, useState } from 'react';

type PropsImage = {
    classNameLoader?: string;
    className?: string;
    src: string;
    alt: string;
} & Omit<ImageProps, 'className' | 'src' | 'alt'>;

export const ImageLoader: FC<PropsImage> = ({
    src,
    alt,
    className,
    classNameLoader,
    ...props
}) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    return (
        <>
            {!imageLoaded && (
                <Skeleton
                    className={cn('w-full h-full bg-primary', classNameLoader)}
                />
            )}
            <Image
                {...props}
                className={cn(
                    `object-cover w-full h-full transition-opacity`,
                    imageLoaded ? 'opacity-100' : 'opacity-0',
                    className
                )}
                onLoad={e => setImageLoaded(true)}
                loading="lazy"
                src={src}
                alt={alt}
            />
        </>
    );
};
