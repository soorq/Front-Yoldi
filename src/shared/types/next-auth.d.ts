import 'next-auth';
import type { IUser } from '~&/src/shared/types/User.interface';
import type { RolesEnum } from '~&/src/shared/types/roles.enum';

declare module 'next-auth/jwt' {
    interface JWT {
        user: IUser;
        slug: string;
        _api_key: string;
    }
}

declare module 'next-auth' {
    interface DefaultUser extends IUser {}

    interface User extends Omit<DefaultUser, 'id'> {
        image: IUser['image'];
    }

    interface Session {
        user: Omit<User, 'id'>;
        _api_key: string;
        role: RolesEnum;
    }
}
