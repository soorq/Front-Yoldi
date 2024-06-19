import type { TypeUpdateTypeDto } from '~&/src/features/modal-edit/model/update-type.dto';
import { APP_URL } from '~&/src/shared/lib/enviroments';
import useSWRMutation from 'swr/mutation';

export function useUpdateUser() {
    const { data, trigger, error } = useSWRMutation(
        `${APP_URL}/api/edit`,
        async (url, { arg }: { arg: { dto: TypeUpdateTypeDto } }) => {
            return fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(arg.dto)
            }).then(res => res.json());
        }
    );

    return { data, error, trigger };
}
