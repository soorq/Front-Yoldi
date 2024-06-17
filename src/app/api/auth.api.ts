import type { TypeInferSignIn } from '~&/src/features/by-email/model/signin.schema';
import type { IResponseAuth } from '~&/src/app/models/IResponseAuth.interface';
import type { TypeInferSignUp } from '~&/src/features/by-email/model/signup.schema';
import { API_URL, APP_URL } from '~&/src/shared/lib/enviroments';
import axios, { AxiosError } from 'axios';

export async function signIn(data: TypeInferSignIn) {
    try {
        const res = await axios.post<IResponseAuth>(
            `${API_URL}/auth/login`,
            data,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );

        if (!res.data?.value) return Promise.reject(Error(res.data.message));

        return res.data.value;
    } catch (e) {
        return null;
    }
}

export async function signUp(data: TypeInferSignUp) {
    try {
        const res = await axios
            .post(`${APP_URL}/api/register`, data)
            .then(res => res.data);

        console.log(res);

        if (!res?.value) return Promise.reject(Error(res.data.message));

        console.log(res.value);

        return res.value;
    } catch (e) {
        const error = e as unknown as AxiosError;
        return error?.response?.data;
    }
}
