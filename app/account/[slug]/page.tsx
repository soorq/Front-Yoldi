import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { default as Page } from '~&/src/pages/account/owner';
import { API_URL } from '~&/src/shared/lib/enviroments';

export async function generateStaticParams() {
    const users = (await fetch(`${API_URL}/user`).then(res =>
        res.json()
    )) as IResponseUser[];

    return users.map(user => ({
        slug: user.slug
    }));
}

export default async function OwnerPage({
    params
}: {
    params: { slug: string };
}) {
    return <Page slug={params.slug} />;
}
