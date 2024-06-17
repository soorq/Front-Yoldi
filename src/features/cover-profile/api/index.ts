import { APP_URL } from '~&/src/shared/lib/enviroments';
import axios from 'axios';

export async function UpdateCoverProfile({
    name,
    slug,
    file
}: {
    file: File | null;
    name: string;
    slug: string;
}) {
    try {
        const formData = new FormData();
        formData.append('file', file || '');
        const res = await axios.post(
            'https://frontend-test-api.yoldi.agency/api/image',
            formData
        );
        const update = await axios.patch(`${APP_URL}/api/edit`, {
            coverId: res.data.id,
            name,
            slug
        });

        if (res.data.message) return Promise.reject(Error(res.data.message));

        return res.data.url;
    } catch (e) {
        throw e;
    }
}

export async function DeleteCoverProfile({
    name,
    slug
}: {
    name: string;
    slug: string;
}) {
    try {
        const update = await axios.patch(`${APP_URL}/api/edit`, {
            coverId: null,
            name,
            slug
        });

        if (!update.data) return Promise.reject(Error(update.data.message));

        return update.data;
    } catch (e) {
        throw e;
    }
}
