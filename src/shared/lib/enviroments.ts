import { z } from 'zod';

const env_schema = z.object({
    NEXTAUTH_SECRET: z.string({
        description: 'Next Auth is required secret for session secure',
        required_error: '😱 U are missed a secure NEXTAUTH'
    }),
    NODE_ENV: z
        .enum(['development', 'test', 'production'], {
            description: 'Get u know a webpack build'
        })
        .default('development'),
    GITHUB_SECRET: z.string({
        description: 'For github auth - secret',
        required_error: '😱 U are missed a secure GITHUB_SECRET'
    }),
    GITHUB_ID: z.string({
        description: 'For github auth - id',
        required_error: '😱 U are missed a secure GITHUB_ID'
    }),
    API_URL: z
        .string({
            description: 'U are application api back-end env url for requests'
        })
        .url()
        .nonempty(),
    NEXT_PUBLIC_API_URL: z
        .string({
            description: 'U are application api back-end env url for requests'
        })
        .url()
        .nonempty(),
    NEXT_PUBLIC_APP_URL: z.string().url().nonempty()
});

function getEnv(key: string) {
    if (typeof process.env[key] === 'undefined') {
        // throw new Error(`Expected env key: ${key}`);
        console.log(`Expected env key: ${key}`);
    }

    return process.env[key] || '';
}

const API_URL = getEnv('NEXT_PUBLIC_API_URL');
const APP_URL = getEnv('NEXT_PUBLIC_APP_URL');
const NEXTAUTH_SECRET = getEnv('NEXTAUTH_SECRET');
const GITHUB_ID = getEnv('GITHUB_ID');
const GITHUB_SECRET = getEnv('GITHUB_SECRET');

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof env_schema> {}
    }
}
export { API_URL, GITHUB_SECRET, GITHUB_ID, APP_URL, NEXTAUTH_SECRET };
