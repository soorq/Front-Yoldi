import { FormSingIn } from '~&/src/features/by-email';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export default function SignIn() {
    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="w-full h-full flex-grow bg-[#f3f3f3]">
                <section className="w-full h-full justify-center items-center flex">
                    <FormSingIn />
                </section>
            </main>
            <Footer />
        </div>
    );
}
