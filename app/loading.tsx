export default function LoaderRoot() {
    return (
        <section className="w-full h-svh flex justify-center items-center">
            <div className="flex animate-pulse gap-1">
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_1.5s_ease-in-out_infinite] !animation-delay-[-1.3s]" />
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_0.9s_ease-in-out_infinite] !animation-delay-[-1.2s]" />
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_0.9s_ease-in-out_infinite] !animation-delay-[-1.1s]" />
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_0.9s_ease-in-out_infinite] !animation-delay-[-1s]" />
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_0.9s_ease-in-out_infinite] !animation-delay-[-0.9s]" />
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_0.9s_ease-in-out_infinite] !animation-delay-[-0.8s]" />
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_0.9s_ease-in-out_infinite] !animation-delay-[-0.7s]" />
                <div className="transition-transform h-10 w-0.5 bg-primary rounded-md motion-safe:animate-[loading_0.9s_ease-in-out_infinite] !animation-delay-[-0.6s]" />
            </div>
        </section>
    );
}
