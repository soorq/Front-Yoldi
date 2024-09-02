'use server';

import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { env } from '~&/src/shared/lib/enviroments';

export async function getListUsers(): Promise<IResponseUser[]> {
    return fetch(`${env.API_URL}/user`, {
        method: 'GET',
        next: {
            revalidate: 5 * 60 * 60
        }
    }).then(res => res.json());
}
