import type { IResponseAuth } from '~&/src/app/models/IResponseAuth.interface';
import type { TypeUpdateTypeDto } from '~&/src/features/modal-edit/model/update-type.dto';
import axios from 'axios';

export async function UpdateUser(dto: TypeUpdateTypeDto) {
    try {
        const res = await axios.patch<IResponseAuth>(
            'http://localhost:3000/api/edit',
            dto
        );
        if (res.data.message) return Promise.reject(Error(res.data.message));
        return res;
    } catch (e) {
        throw e;
    }
}
