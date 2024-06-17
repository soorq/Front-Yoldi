import type { TypeInferSignIn } from '~&/src/features/by-email/model/signin.schema';
import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { IS_DEV, NEXTAUTH_SECRET } from '~&/src/shared/lib/enviroments';
import CredentialsProvider from 'next-auth/providers/credentials';
import { RolesEnum } from '~&/src/shared/types/roles.enum';
import type { NextAuthOptions } from 'next-auth';
import { signIn } from '~&/src/app/api/auth.api';
import axios from 'axios';

export const authOptions = {
    secret: NEXTAUTH_SECRET,
    session: {
        updateAge: 5 * 60 * 60,
        strategy: 'jwt',
        maxAge: 3 * 60 * 60
    },
    pages: {
        signIn: '/login',
        newUser: '/register'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            // @ts-expect-error
            async authorize(cred: TypeInferSignIn) {
                try {
                    const token = await signIn(cred);

                    if (!token) {
                        return null;
                    }

                    const user = await axios.get<IResponseUser>(
                        `https://frontend-test-api.yoldi.agency/api/profile`,
                        {
                            headers: {
                                'x-api-key': token
                            }
                        }
                    );

                    // Тут апи кей, в виде токена, передаю на id, чтоб по типам не ругался
                    return {
                        id: token,
                        ...user.data,
                        role: RolesEnum.OWNER
                    };
                } catch (e) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token._api_key = user.id;
                token.role = user.role as RolesEnum;
                token.user = user as IResponseUser;
            }

            return token;
        },
        async session({ session, token }) {
            if (session) {
                session._api_key = token._api_key;
                session.role = token.role;
                session.user = token.user;
            }
            return session;
        }
    },
    debug: IS_DEV === 'development'
} satisfies NextAuthOptions;
