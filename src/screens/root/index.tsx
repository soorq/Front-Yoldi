import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { ListUsers } from '~&/src/widgets/list-users';
import { Header } from '~&/src/widgets/header';

export default function RootPage({ users }: { users: IResponseUser[] }) {
    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="w-full h-full">
                <ListUsers data={users ?? null} />
            </main>
        </div>
    );
}
