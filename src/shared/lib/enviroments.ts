const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const IS_DEV = process.env.NODE_ENV;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export { NEXTAUTH_SECRET, API_URL, APP_URL, IS_DEV };
