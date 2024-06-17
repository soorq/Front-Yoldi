import type { IResponseUser } from '~&/src/shared/types/User.interface';

export type TypeUpdateDto = Partial<IResponseUser> & {
    file: File | null;
    type: 'cover' | 'image';
};
