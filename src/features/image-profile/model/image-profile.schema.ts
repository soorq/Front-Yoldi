import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 2; //5MB

const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
];

export const ImageProfileSchema = z.object({
    file: z
        .instanceof(File)
        .refine(
            file => file.size < MAX_FILE_SIZE,
            'Файл больше 2мб, попробуйте сжать и загрузить заново!'
        )
        .refine(
            file => ACCEPTED_IMAGE_TYPES.includes(file.type),
            'Поддерживаемые форматы: *.png, *.jpg, *.jpeg, *.webp '
        )
        .nullable()
});

export type TypeInferImageSchema = z.infer<typeof ImageProfileSchema>;
