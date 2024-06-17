import { cva } from 'class-variance-authority';

export const ImageProfileVariants = cva(
    'w-full h-auto aspect-square border border-input ',
    {
        variants: {
            size: {
                sm: 'max-w-[50px] max-h-[50px] text-lg leading-[160%]',
                lg: 'max-w-[100px] max-h-[100px] text-[36px] leading-[320%] relative group z-10'
            }
        },
        defaultVariants: {
            size: 'sm'
        }
    }
);
