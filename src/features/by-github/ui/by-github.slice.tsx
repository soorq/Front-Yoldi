'use client';

import { Button } from '~&/src/shared/ui/button';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';

export function ByGithubSlice() {
    return (
        <Button
            onClick={() => signIn('github', { redirect: false })}
            type="button"
        >
            <Github />
            <span className="">Sign By Github</span>
        </Button>
    );
}
