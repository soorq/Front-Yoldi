export { default } from 'next-auth/middleware';

export const config = {
    mather: ['/((?!api|_next/static|_next/image).*)']
};
