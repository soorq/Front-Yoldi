import type { TypeInferSignIn } from '~&/src/features/by-email/model/signin.schema';
import type { IResponseUser } from '~&/src/shared/types/User.interface';
import CredentialsProvider from 'next-auth/providers/credentials';
import { RolesEnum } from '~&/src/shared/types/roles.enum';
import GitHubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';
import { signIn } from '~&/src/app/api/auth.api';
import {
    GITHUB_SECRET,
    GITHUB_ID,
    NEXTAUTH_SECRET
} from '~&/src/shared/lib/enviroments';

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
        GitHubProvider({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET
        }),
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

                    const user = await fetch(
                        `https://frontend-test-api.yoldi.agency/api/profile`,
                        {
                            method: 'GET',
                            headers: {
                                'x-api-key': token
                            }
                        }
                    ).then(res => res.json());

                    // Тут апи кей, в виде токена, передаю на id, чтоб по типам не ругался
                    return {
                        ...user,
                        role: RolesEnum.OWNER,
                        id: token
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
                token.user = user as IResponseUser;
            }

            return token;
        },
        async session({ session, token }) {
            if (session) {
                session.user = token.user;
            }
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development'
} satisfies NextAuthOptions;
