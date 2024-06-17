import { RolesEnum } from '~&/src/shared/types/roles.enum';

export interface IResponseUser {
    name: string;
    email: string;
    slug: string;
    description: string;
    image: {
        id: string;
        url: string;
        width: string;
        height: string;
    } | null;
    cover: {
        id?: string;
        url: string;
        width?: string;
        height?: string;
    } | null;
}

export interface IUser extends IResponseUser {
    role: RolesEnum;
}
