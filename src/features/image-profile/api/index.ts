import { API_URL, APP_URL } from '~&/src/shared/lib/enviroments';
import useSWRMutation from 'swr/mutation';

export function useUpdateImage() {
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
                    type: 'image'
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

export function useDeleteImage() {
    const dto = {
        id: null,
        type: 'image'
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
