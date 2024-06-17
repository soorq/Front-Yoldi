import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { API_URL } from '~&/src/shared/lib/enviroments';
import RootPage from '~&/src/screens/root';

async function getListUsers(): Promise<IResponseUser[]> {
    return fetch(`${API_URL}/user`, {
        method: 'GET',
        next: {
            revalidate: 5 * 60 * 60
        }
    }).then(res => res.json());
}

export default async function Home() {
    const users = await getListUsers();

    return <RootPage users={users} />;
}
