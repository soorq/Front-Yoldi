import { API_URL, APP_URL } from '~&/src/shared/lib/enviroments';
import useSWRMutation from 'swr/mutation';

export function useUpdateCover() {
    const { data, trigger, error } = useSWRMutation(
        `${APP_URL}/api/edit/file`,
        async (url, { arg }: { arg: { file: File } }) => {
            const data = new FormData();
            data.append('file', arg.file);

            const image = await fetch(`${API_URL}/image`, {
                method: 'POST',
                body: data
            }).then(res => res.json());

            return fetch(url, {
                method: 'PATCH',
                body: JSON.stringify({
                    id: image.id,
                    type: 'cover'
                })
            });
        }
    );

    return {
        data,
        error,
        trigger
    };
}

export function useDeleteCover() {
    const dto = {
        coverId: null,
        type: 'cover'
    };

    const { data, trigger, error } = useSWRMutation(
        `${APP_URL}/api/edit/file`,
        async url => {
            return fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(dto)
            }).then(res => res.json());
        }
    );

    return {
        data,
        error,
        trigger
    };
}
