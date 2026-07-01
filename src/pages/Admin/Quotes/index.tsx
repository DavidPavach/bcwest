import { Eye, SearchNormal, Sms, Trash } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import { Input } from "#/components/ui/input";
import { useDeleteQuote } from "#/services/mutations";
import { useAllQuotes } from "#/services/queries";
import { formatCurrency } from "#/utils/format";
import View from "./View";

const index = () => {
    const deleteQuote = useDeleteQuote();
    const { data, isLoading, isError, refetch } = useAllQuotes();
    const quotes: Quote[] = data?.rows || [];

    const [search, setSearch] = useState<string>("");
    const [selected, setSelected] = useState<Quote | null>(null);

    if (isLoading) return <AdminLoader />;

    if (isError)
        return (
            <AdminError
                message="Failed to Load your Quotes, Kindly press the button to reload."
                onRetry={refetch}
            />
        );

    const filtered = quotes.filter((q) => {
        const matchSearch =
            q.company.toLowerCase().includes(search.toLowerCase()) ||
            q.email.toLowerCase().includes(search.toLowerCase()) ||
            q.productName.toLowerCase().includes(search.toLowerCase()) ||
            q.terminalId.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });

    const handleDelete = (id: string) => {
        const proceed = confirm("Do you want to delete this quote?");
        if (!proceed) return toast.error("Action Cancelled");

        deleteQuote.mutate(
            { data: { quoteId: id } },
            {
                onSuccess: () => {
                    toast.success("Quote was Deleted successfully");
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to Delete Quote, Please Try Again.";
                    toast.error(message);
                },
            },
        );
    };

    return (
        <>
            {selected && (
                <Overlay
                    open={!!selected}
                    onClose={() => setSelected(null)}
                    classNames="max-w-2xl"
                >
                    <View quote={selected} onClose={() => setSelected(null)} />
                </Overlay>
            )}
            <header className="mb-8">
                <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                    Quote Management
                </h1>
                <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    View, Delete and Manage your Quotes
                </p>
            </header>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative w-full">
                    <SearchNormal className="top-1/2 left-3 absolute size-3 md:size-3.5 xl:size-4 text-muted-foreground -translate-y-1/2" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by company, product, email or terminal ID…"
                        className="pl-9 h-10"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/30 border-border/50 border-b">
                                {[
                                    "Company",
                                    "Product",
                                    "Terminal ID",
                                    "Cost",
                                    "Date",
                                    "Actions",
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-3 font-bold text-muted-foreground text-xs text-left uppercase tracking-wider"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((q) => (
                                <tr
                                    key={q.id}
                                    className="hover:bg-muted/20 border-border/30 border-b transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex justify-center items-center bg-primary/10 size-8 font-bold text-primary text-sm shrink-0">
                                                {q.company.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground text-sm">
                                                    {q.company}
                                                </div>
                                                <div className="text-muted-foreground text-xs">
                                                    {q.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-foreground text-sm">
                                        {q.productName}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                                            {q.terminalId}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-foreground text-sm">
                                        {formatCurrency(q.calculatedCost)}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                                        {new Date(q.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setSelected(q)}
                                                className="hover:bg-primary/10 p-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                                title="View"
                                            >
                                                <Eye className="size-4" />
                                            </button>
                                            <a
                                                href={`mailto:${q.email}`}
                                                className="hover:bg-primary/10 p-1.5 text-muted-foreground hover:text-primary transition-colors"
                                                title="Reply"
                                            >
                                                <Sms className="size-4" />
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(q.id)}
                                                className="hover:bg-destructive/10 p-1.5 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default index;
