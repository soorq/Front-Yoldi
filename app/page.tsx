import RootPage from '~&/src/screens/root';
import { getListUsers } from '~&/src/screens/root/action.server';

export default async function Home() {
    const users = await getListUsers();

    return <RootPage users={users} />;
}
