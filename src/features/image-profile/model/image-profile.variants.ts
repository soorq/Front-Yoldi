import { cva } from 'class-variance-authority';

export const ImageProfileVariants = cva(
    'w-full h-auto aspect-square bg-background-secondary border border-stroke-secondary',
    {
        variants: {
            size: {
                sm: 'size-[50px] text-lg',
                lg: 'size-[100px] relative group z-10 text-4xl'
            }
        },
        defaultVariants: {
            size: 'sm'
        }
    }
);
