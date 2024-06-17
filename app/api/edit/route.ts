import { authOptions } from '~&/src/shared/api/next-auth.api';
import { type NextRequest, NextResponse } from 'next/server';
import { API_URL } from '~&/src/shared/lib/enviroments';
import axios, { type AxiosError } from 'axios';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
    try {
        // Получаем токен, который производит аунтефикацию юзера на бэке
        const session = await getServerSession(authOptions);

        // Получаем дату, переданную, для редактирования
        const data = await req.json();

        const res = await axios.patch(`${API_URL}/profile`, data, {
            headers: {
                'x-api-key': session?._api_key ?? ''
            }
        });

        if (!res.data) return Promise.reject(res.statusText);

        return NextResponse.json({ ...res.data });
    } catch (e) {
        const err = e as unknown as AxiosError;
        return NextResponse.json(
            { message: err.message },
            {
                status: err?.response?.status,
                statusText: err?.response?.statusText
            }
        );
    }
}
