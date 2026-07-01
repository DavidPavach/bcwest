import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    ArrowRight2,
    Box,
    DocumentText,
    MessageSquare,
    NoteText,
    ReceiptItem,
    User,
} from "iconsax-reactjs";

import {
    useAllContacts,
    useAllInvoices,
    useAllQuotes,
    useAllTSRs,
} from "#/services/queries";
import { formatCurrency, formatDate } from "#/utils/format";

const index = () => {
    // Fetch data using your existing queries
    const { data: contactsData, isLoading: loadingContacts } = useAllContacts();
    const { data: quotesData, isLoading: loadingQuotes } = useAllQuotes();
    const { data: tsrData } = useAllTSRs();
    const { data: invoicesData } = useAllInvoices();

    // Safely extract rows (falling back to empty arrays)
    const contacts: Contact[] = contactsData?.rows || [];
    const quotes: Quote[] = quotesData?.rows || [];
    const tsrs: TSR[] = tsrData?.rows || [];
    const invoices: Invoice[] = invoicesData?.rows || [];

    // Helper to calculate items created in the last 7 days
    const getNewCount = (items: { createdAt: string }[]) => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return items.filter((item) => new Date(item.createdAt) >= sevenDaysAgo)
            .length;
    };

    // Stats configuration mapping actual data
    const stats = [
        {
            icon: MessageSquare,
            label: "Total Contacts",
            value: contacts.length,
            sub: `${getNewCount(contacts)} new this week`,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            icon: DocumentText,
            label: "Total Quotes",
            value: quotes.length,
            sub: `${getNewCount(quotes)} new this week`,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            icon: ReceiptItem,
            label: "Total TSRs",
            value: tsrs.length,
            sub: `${getNewCount(tsrs)} new this week`,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            icon: NoteText,
            label: "Total Invoices",
            value: invoices.length,
            sub: `${getNewCount(invoices)} new this week`,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
    ];

    // Get the top 5 most recent items for the activity tables
    const recentContacts = [...contacts]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5);

    const recentQuotes = [...quotes]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5);

    return (
        <main>
            <header className="mb-8">
                <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                    Dashboard
                </h1>
                <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Welcome back — here's what's happening today.
                </p>
            </header>

            {/* Stats Grid */}
            <div className="gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((s, i) => (
                    <motion.div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <>
                        key={`stats_dashboard_${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex flex-col justify-between bg-card p-4 md:p-5 border border-border/50"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div
                                className={`size-8 md:size-10 ${s.bg} flex items-center justify-center`}
                            >
                                <s.icon className={`size-4 md:size-5 ${s.color}`} />
                            </div>
                        </div>
                        <div>
                            <div className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                                {s.value}
                            </div>
                            <div className="mt-1 font-medium text-[11px] text-foreground md:text-xs xl:text-sm">
                                {s.label}
                            </div>
                            <div className="mt-1 text-[10px] text-muted-foreground md:text-[11px]">
                                {s.sub}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="gap-6 lg:gap-8 grid grid-cols-1 lg:grid-cols-2">
                {/* Recent Quotes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col bg-card border border-border/50 overflow-hidden"
                >
                    <div className="flex justify-between items-center p-4 md:p-5 border-border/50 border-b">
                        <h2 className="font-heading font-bold text-sm md:text-base">
                            Recent Quotes
                        </h2>
                        <Link
                            to="/quotes"
                            className="flex items-center gap-1 text-primary text-xs hover:underline"
                        >
                            View All <ArrowRight2 className="size-3" />
                        </Link>
                    </div>
                    <div className="flex-1 p-4 md:p-5 overflow-x-auto">
                        <div className="space-y-4 min-w-75">
                            {loadingQuotes ? (
                                <p className="text-muted-foreground text-xs">Loading...</p>
                            ) : recentQuotes.length === 0 ? (
                                <p className="text-muted-foreground text-xs">
                                    No recent quotes found.
                                </p>
                            ) : (
                                recentQuotes.map((quote) => (
                                    <div
                                        key={quote.id}
                                        className="flex justify-between items-center gap-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-muted p-2 text-muted-foreground shrink-0">
                                                <Box className="size-4 md:size-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-xs md:text-sm line-clamp-1">
                                                    {quote.company}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground md:text-xs">
                                                    {quote.productName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-medium text-xs md:text-sm">
                                                {formatCurrency(quote.calculatedCost)}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground md:text-xs">
                                                {formatDate(quote.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Recent Contacts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col bg-card border border-border/50 overflow-hidden"
                >
                    <div className="flex justify-between items-center p-4 md:p-5 border-border/50 border-b">
                        <h2 className="font-heading font-bold text-sm md:text-base">
                            Recent Contacts
                        </h2>
                        <Link
                            to="/contacts"
                            className="flex items-center gap-1 text-primary text-xs hover:underline"
                        >
                            View All <ArrowRight2 className="size-3" />
                        </Link>
                    </div>
                    <div className="flex-1 p-4 md:p-5 overflow-x-auto">
                        <div className="space-y-4 min-w-75">
                            {loadingContacts ? (
                                <p className="text-muted-foreground text-xs">Loading...</p>
                            ) : recentContacts.length === 0 ? (
                                <p className="text-muted-foreground text-xs">
                                    No recent contacts found.
                                </p>
                            ) : (
                                recentContacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className="flex justify-between items-center gap-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 text-primary shrink-0">
                                                <User className="size-4 md:size-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-xs md:text-sm line-clamp-1">
                                                    {contact.fullName}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground md:text-xs line-clamp-1">
                                                    {contact.company}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="inline-block bg-muted mb-1 px-2 py-1 text-[10px] text-muted-foreground md:text-xs capitalize">
                                                {contact.service}
                                            </span>
                                            <p className="block text-[10px] text-muted-foreground">
                                                {formatDate(contact.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default index;
