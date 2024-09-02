import { ByGithubSlice } from '~&/src/features/by-github';
import { FormSingIn } from '~&/src/features/by-email';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export default function SignIn() {
    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="w-full h-full flex-grow bg-background-secondary">
                <section className="w-full h-full justify-center items-center flex">
                    <div className="flex">
                        <FormSingIn />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
