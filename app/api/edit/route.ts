import { authOptions } from '~&/src/shared/api/next-auth.api';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '~&/src/shared/lib/enviroments';
import { getServerSession } from 'next-auth';

async function handler(req: NextRequest) {
    try {
        // Получаем токен, который производит аунтефикацию юзера на бэке
        const session = await getServerSession(authOptions);

        // Получаем дату, переданную, для редактирования
        const data = await req.json();

        const res = await fetch(`${env.API_URL}/profile`, {
            method: 'PATCH',
            headers: {
                'x-api-key': session?.user.id ?? ''
            },
            body: JSON.stringify(data)
        }).then(res => res.json());

        if (!res) return Promise.reject(res.statusText);

        return NextResponse.json({ ...res.data });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}

export { handler as PATCH };
