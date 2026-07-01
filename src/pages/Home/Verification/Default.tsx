import { Link, useNavigate } from "@tanstack/react-router";
import {
    ArrowRight3,
    DocumentText1,
    type Icon,
    InfoCircle,
    Math as MathIcon,
    Personalcard,
    ShieldSecurity,
} from "iconsax-reactjs";

import { Route } from "#/routes/_home/verification";

const PAGES: {
    Icon: Icon;
    title: string;
    body: string;
    link: string;
    url: "tsr" | "quotes" | "docs" | "invoice" | "other";
}[] = [
        {
            Icon: DocumentText1,
            title: "Invoice Verification",
            body: "Verify the authenticity and payment status of your invoices through our automated ledger system.",
            link: "Verify Quote",
            url: "invoice",
        },
        {
            Icon: ShieldSecurity,
            title: "TSR Verification",
            body: "Authenticate Tank Storage Receipts (TSR) and confirm available inventory volumes in real-time.",
            link: "Validate Receipt",
            url: "tsr",
        },
        {
            Icon: Personalcard,
            title: "Document Verification",
            body: "View and download securely verified legal and operational documents for compliance auditing.",
            link: "Access Files",
            url: "docs",
        },
        {
            Icon: MathIcon,
            title: "Instant Quote",
            body: "Calculate estimated tank storage rental costs instantly based on volume and duration requirements.",
            link: "Generate Quote",
            url: "quotes",
        },
        {
            Icon: InfoCircle,
            title: "Other Services",
            body: "Need to verify something else? Contact our administration team for manual verification and support.",
            link: "Contact Support",
            url: "other",
        },
    ];

const Default = () => {
    return (
        <main>
            <section className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-24 max-w-screen-2xl">
                {PAGES.map((page) => (
                    <Card
                        key={page.title}
                        Icon={page.Icon}
                        title={page.title}
                        body={page.body}
                        link={page.link}
                        url={page.url}
                    />
                ))}
            </section>
        </main>
    );
};

export default Default;

const Card = ({
    Icon,
    title,
    body,
    link,
    url,
}: {
    Icon: Icon;
    title: string;
    body: string;
    link: string;
    url: "tsr" | "quotes" | "docs" | "invoice" | "other";
}) => {
    const navigate = useNavigate({ from: Route.fullPath });

    // Functions
    const setNewSearch = (
        verify: "tsr" | "quotes" | "docs" | "invoice" | undefined,
    ) => {
        navigate({
            search: (prev) => ({
                ...prev,
                verify,
            }),
        });
    };

    return (
        <main className="group bg-card p-4 md:p-5 xl:p-6 text-card-foreground cursor-pointer">
            <div className="bg-gold/20 p-2 w-fit text-gold">
                <Icon className="size-5 md:size-5.5 xl:size-6" variant="Bold" />
            </div>
            <section className="space-y-4 mt-4">
                <h4 className="font-semibold text-lg md:text-xl xl:text-2xl">
                    {title}
                </h4>
                <p className="text-muted-foreground">{body}</p>
                {url !== "other" ? (
                    <button
                        type="button"
                        onClick={() => setNewSearch(url)}
                        className="flex items-center gap-x-2 text-[10px] text-gold md:text-[11px] xl:text-xs cursor-pointer"
                    >
                        {link}
                        <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 group-hover:translate-x-2 duration-200" />
                    </button>
                ) : (
                    <Link
                        to="/contact"
                        className="flex items-center gap-x-2 text-[10px] text-gold md:text-[11px] xl:text-xs"
                    >
                        {link}
                        <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 group-hover:translate-x-2 duration-200" />
                    </Link>
                )}
            </section>
        </main>
    );
};
