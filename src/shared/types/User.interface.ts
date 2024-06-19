import type { RolesEnum } from '~&/src/shared/types/roles.enum';

export interface IResponseUser {
    id: string;
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
    role: RolesEnum;
}
