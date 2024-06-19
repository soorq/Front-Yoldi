import { API_URL, APP_URL } from '~&/src/shared/lib/enviroments';
import {
    FormSignInSchema,
    type TypeInferSignIn
} from '~&/src/features/by-email/model/signin.schema';
import {
    FormSignUpSchema,
    type TypeInferSignUp
} from '~&/src/features/by-email/model/signup.schema';

export async function signIn(data: TypeInferSignIn) {
    try {
        const dto = FormSignInSchema.safeParse(data);

        if (!dto.success) return Promise.reject(Error(dto.error.message));

        const res = await fetch(`${API_URL}/auth/login`, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto.data)
        }).then(res => res.json());

        if (!res?.value) return Promise.reject(Error(res));

        return res.value;
    } catch (e) {
        return null;
    }
}

export async function signUp(data: TypeInferSignUp) {
    try {
        const dto = FormSignUpSchema.safeParse(data);

        if (dto.error?.message) return Promise.reject(dto.error.message);

        const res = await fetch(`${APP_URL}/api/register`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json());

        if (!res?.value) return Promise.reject(Error(res.data.message));

        return res.value;
    } catch (e) {
        return e;
    }
}
