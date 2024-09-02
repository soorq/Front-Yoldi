import { authOptions } from '~&/src/shared/api/next-auth.api';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '~&/src/shared/lib/enviroments';
import { getServerSession } from 'next-auth';

async function handler(req: NextRequest) {
    try {
        // Получаем токен, который производит аунтефикацию юзера на бэке
        const session = await getServerSession(authOptions);

        // Получаем дату, переданную, для редактирования
        const reqData = await req.json();

        const dto = Object.assign(
            {
                name: session?.user.name
            },
            reqData.type === 'cover'
                ? { coverId: reqData.id ?? null }
                : { imageId: reqData.id ?? null },
            {
                slug: session?.user.slug
            }
        );

        const res = await fetch(`${env.API_URL}/profile`, {
            method: 'PATCH',
            headers: {
                'x-api-key': session?.user.id ?? ''
            },
            body: JSON.stringify(dto)
        }).then(res => res.json());

        if (res?.message) return Promise.reject(res.message);

        return NextResponse.json({ ...res.data });
    } catch (e) {
        return NextResponse.json(
            {},
            { status: 400, statusText: 'Bad Request' }
        );
    }
}

export { handler as PATCH };
