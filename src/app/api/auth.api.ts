import type { IResponseAuth } from '~&/src/features/by-email/model/IResponseAuth.interface';
import type { TypeInferSignUp } from '~&/src/features/by-email/model/signup.schema';
import type { TypeInferSignIn } from '~&/src/features/by-email/model/signin.schema';
import { API_URL } from '~&/src/shared/lib/enviroments';
import axios from 'axios';

export async function signUp(data: TypeInferSignUp) {
    try {
        const res = await axios.post<IResponseAuth>(
            `${API_URL}/auth/sign-up`,
            data,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );

        if (!res.data?.value) return Promise.reject(Error(res.data?.message));

        return res.data.value;
    } catch (e) {
        return null;
    }
}

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
