import 'next-auth';
import type { IResponseUser } from '~&/src/shared/types/User.interface';
import type { RolesEnum } from '~&/src/shared/types/roles.enum';

declare module 'next-auth/jwt' {
    interface JWT {
        user: IResponseUser;
        slug: string;
        _api_key: string;
        role: RolesEnum;
    }
}

declare module 'next-auth' {
    interface DefaultUser extends IResponseUser {}

    interface User extends Omit<DefaultUser, 'id'> {
        image: IResponseUser['image'];
        role?: RolesEnum;
    }

    interface Session {
        user: Omit<User, 'id'>;
        _api_key: string;
        role: RolesEnum;
    }
}
