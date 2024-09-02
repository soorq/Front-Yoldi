import type { IResponseAuth } from '~&/src/app/models/IResponseAuth.interface';
import { FormSignUpSchema } from '~&/src/features/by-email/model/signup.schema';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '~&/src/shared/lib/enviroments';
import axios, { type AxiosError } from 'axios';

async function handler(req: NextRequest) {
    try {
        const data = FormSignUpSchema.safeParse(await req.json());

        if (!data.success) return Promise.reject(data);

        const res = await axios.post<IResponseAuth>(
            `${env.API_URL}/auth/sign-up`,
            data.data,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );

        if (!res.data?.value) return Promise.reject(Error(res.data?.message));

        return NextResponse.json({ ...res.data });
    } catch (e) {
        const err = e as unknown as AxiosError<{ message: string }>;
        return NextResponse.json(
            { message: err?.response?.data.message },
            {
                status: err?.response?.status,
                statusText: err?.response?.statusText
            }
        );
    }
}

export { handler as POST };
