import type { TypeStore } from '~&/src/entities/viewer/lib/types/index.type';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';
import { IS_DEV } from '~&/src/shared/lib/enviroments';
import { create } from 'zustand';

export const $user = create<TypeStore>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                signin: () => {},
                signout: () => {},
                signup: () => {},
                update: () => {}
            }),
            {
                name: 'By-Email Auth_Persist',
                storage: createJSONStorage(() => localStorage)
            }
        ),
        {
            name: 'By-Email Auth_Devtools',
            enabled: IS_DEV === 'development'
        }
    )
);
