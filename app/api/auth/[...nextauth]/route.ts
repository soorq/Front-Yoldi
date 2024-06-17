import { authOptions } from '~&/src/shared/api/next-auth.api';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
