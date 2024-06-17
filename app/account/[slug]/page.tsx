import type { IResponseUser } from '~&/src/shared/types/User.interface';
import { default as Page } from '~&/src/screens/account/owner';
import { API_URL } from '~&/src/shared/lib/enviroments';
import type { Metadata } from 'next';
import axios from 'axios';

export async function generateStaticParams() {
    const users = (await fetch(`${API_URL}/user`).then(res =>
        res.json()
    )) as IResponseUser[];

    return users.map(user => ({
        slug: user.slug
    }));
}

export async function generateMetadata({
    params
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const user = (await axios
        .get(`${API_URL}/user/${params.slug}`)
        .then(res => res.data)) as IResponseUser;

    return {
        title: `Профиль юзера ${user.name}`,
        description: `${user?.description || ''}`,
        twitter: {
            card: 'summary',
            title: user.name,
            description: user.description,
            images: {
                alt: `Аватар юзера - ${user.slug}`,
                url: user.image?.url || ''
            }
        }
    };
}

export default async function OwnerPage({
    params
}: {
    params: { slug: string };
}) {
    return <Page slug={params.slug} />;
}
