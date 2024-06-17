import { cva } from 'class-variance-authority';

export const ImageProfileVariants = cva(
    'w-full h-auto aspect-square border border-input text-[36px] leading-[320%]',
    {
        variants: {
            size: {
                sm: 'max-w-[50px] max-h-[50px]',
                lg: 'max-w-[100px] max-h-[100px]'
            }
        },
        defaultVariants: {
            size: 'sm'
        }
    }
);
