import { z } from 'zod';

export const SchemaModalForm = z.object({
    name: z.string(),
    url: z.string(),
    description: z.string()
});

export type TypeInferSchemaModalForm = z.infer<typeof SchemaModalForm>;
