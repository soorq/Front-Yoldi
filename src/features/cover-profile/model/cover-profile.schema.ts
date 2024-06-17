import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5; //5MB

const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
];

export const CoverProfileSchema = z.object({
    file: z
        .instanceof(File)
        .refine(
            file => file.size < MAX_FILE_SIZE,
            'Файл больше 5мб, попробуйте сжать и загрузить заново!'
        )
        .refine(
            file => ACCEPTED_IMAGE_TYPES.includes(file.type),
            'Поддерживаемые форматы: *.png, *.jpg, *.jpeg, *.webp '
        )
        .nullable()
});

export type TypeInferCoverSchema = z.infer<typeof CoverProfileSchema>;
