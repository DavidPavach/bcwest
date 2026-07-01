import { motion } from "framer-motion";
import { ArrowRight3, Danger, Refresh2, SearchNormal } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import DocsVerification from "#/components/DocsVerification";
import Invoice from "#/components/Invoice";
import { Overlay } from "#/components/Overlay";
import TSR from "#/components/TSR";
import { Button } from "#/components/ui/button";
import { Route } from "#/routes/_home/verification";
import { useDocument, useInvoice, useTSR } from "#/services/queries";

const Form = ({ page }: { page: string }) => {
    const search = Route.useSearch();
    const defaultCode = search.number;

    const [code, setCode] = useState<string>(defaultCode || "");

    const documentQuery = useDocument(code, page === "docs");
    const tsrQuery = useTSR(code, page === "tsr");
    const invoiceQuery = useInvoice(code, page === "invoice");

    const query =
        page === "docs" ? documentQuery : page === "tsr" ? tsrQuery : invoiceQuery;

    const { data, isLoading, isError, refetch } = query;

    return (
        <>
            {data && (
                <Overlay
                    open={!!data}
                    onClose={() => setCode("")}
                    classNames="max-w-7xl mx-auto"
                >
                    {page === "tsr" && <TSR tsr={data} />}
                    {page === "invoice" && <Invoice invoice={data} />}
                    {page === "docs" && <DocsVerification doc={data} />}
                </Overlay>
            )}
            {code.trim().length > 5 && isError && (
                <Overlay
                    open={code.trim().length > 5 && isError}
                    onClose={() => setCode("")}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center bg-card shadow p-4 md:p-6 xl:p-8 border border-border rounded-2xl w-full max-w-md text-center"
                    >
                        <div className="flex justify-center items-center bg-destructive/10 rounded-full size-12 md:size-14 xl:size-16">
                            <Danger className="size-6 md:size-7 xl:size-8 text-destructive" />
                        </div>

                        <h2 className="mt-5 font-semibold text-card-foreground text-base md:text-lg xl:text-xl">
                            Oops!
                        </h2>

                        <p className="mt-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                            Failed to Load {page === "docs" ? "Document" : page.toUpperCase()}
                            . Kindly check the entered details and try again
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="inline-flex items-center gap-2 bg-primary hover:opacity-90 mt-6 px-5 py-3 rounded-xl font-medium text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-opacity"
                        >
                            <Refresh2 className="size-4 md:size-4.5 xl:size-5" />
                            Try Again
                        </button>
                    </motion.div>
                </Overlay>
            )}
            <main className="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-24 max-w-screen-2xl">
                <header className="text-center">
                    <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl uppercase">
                        {page === "docs" ? "Document" : page.toUpperCase()} verification
                        engine.
                    </h1>
                    <h6 className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm capitalize">
                        Enter the unique Digit Hash for Instant{" "}
                        {page === "docs" ? "Document" : page.toUpperCase()} verification.
                    </h6>
                </header>
                <section className="flex items-center gap-x-5 md:gap-x-7 xl:gap-x-10 bg-primary/10 mt-10 py-1 pr-2 pl-2 md:pl-6 xl:pl-8 border border-border">
                    <SearchNormal className="size-4 md:size-4.5 xl:size-5 shrink-0" />
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        className="flex-1 px-2 py-3 border-0 focus:outline-0 ring-0 placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm focus:caret-gold"
                        placeholder={`BCWEST-${page.toLocaleUpperCase()}-001`}
                    />
                    <Button className="px-6 md:px-8 xl:px-10">
                        Verify
                        {isLoading ? (
                            <Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                        ) : (
                            <ArrowRight3 className="size-4 md:size-4.5 xl:size-5" />
                        )}
                    </Button>
                </section>
            </main>
        </>
    );
};

export default Form;
