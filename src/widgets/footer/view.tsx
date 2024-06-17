export function Footer({
    href,
    text,
    textLink
}: {
    href: string;
    text: string;
    textLink: string;
}) {
    return (
        <footer className="w-full h-auto border-t border-input bg-white">
            <div className="max-w-fit mx-auto py-[23px] flex gap-2.5">
                <p className="text-base leading-[160%] text-muted-foreground tracking-wide">
                    {text}
                </p>
                <a
                    href={href}
                    className="text-base leading-[160%] font-medium tracking-wide"
                >
                    <span className=""> {textLink}</span>
                </a>
            </div>
        </footer>
    );
}
