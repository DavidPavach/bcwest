import {
    Box,
    Building,
    Buildings,
    Calculator,
    Calendar,
    Clock,
    DocumentDownload,
    DocumentText1,
    DollarSquare,
    GalleryImport,
    type Icon,
    Sms,
    TrendUp,
    WeightMeter,
} from "iconsax-reactjs";
import { Loader, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-fox-toast";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useCreateQuote } from "#/services/mutations";
import { useAllProducts, useAllTerminals } from "#/services/queries";
import { format } from "#/utils/format";
import { downloadAsImage, downloadAsPdf } from "#/utils/generate";

type Result = {
    storageRate: number;
    totalCost: number;
    quoteValidity: string;
}
const Quote = () => {

    const docRef = useRef<HTMLDivElement | null>(null);

    const [downloading, setDownloading] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [terminal, setTerminal] = useState<string>("");
    const [product, setProduct] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [duration, setDuration] = useState<string>("30");
    const [result, setResult] = useState<Result | null>(null);

    const newQuote = useCreateQuote();
    const { data, isLoading, isError, refetch } = useAllTerminals();
    const {
        data: productData,
        isLoading: productLoading,
        isError: productError,
        refetch: productRefetch,
    } = useAllProducts();

    const terminals: Terminals[] = data?.rows || [];
    const products: Products[] = productData?.rows || [];

    const isBusy = isLoading || productLoading;
    const error = isError || productError;

    const selectedTerminal = terminals.find((t) => t.id === terminal) || terminals[0];
    const selectedProduct = products.find((p) => p.id === product) || products[0];


    // Functions
    const refetchAll = () => {
        refetch();
        productRefetch();
    };

    if (isBusy) {
        return <AdminLoader />;
    }

    if (error) {
        return (
            <AdminError
                message="Failed to Load Form, Kindly Click the Button to Refresh"
                onRetry={refetchAll}
            />
        );
    }

    const isValid =
        email.trim() &&
        company.trim() &&
        terminal.trim() &&
        product.trim() &&
        quantity.trim() &&
        duration.trim();

    // Functions
    const handleSubmit = () => {
        if (!isValid) return toast.error("Kindly fill in all the details to continue")
        const payload = {
            email,
            companyName: company,
            terminalId: terminal,
            productId: product,
            quantity: parseInt(quantity, 10),
            days: parseInt(duration, 10)
        }

        newQuote.mutate(
            { data: payload }, {
            onSuccess: (response) => {
                setResult(response);
                toast.success("TSR was created successfully.");
            },
            onError: ({ message }) => {
                toast.error(message || "Failed. Please try again.");
            },
        },
        );
    };

    const handleDownloadPdf = async () => {
        toast.info("Downloading PDF...");

        if (!docRef.current || !result) return;
        setDownloading("pdf");
        try {
            await downloadAsPdf(docRef.current, String(result.totalCost));
        } finally {
            setDownloading("");
        }
    };

    const handleDownloadImage = async () => {
        toast.info("Downloading Image...");

        if (!docRef.current || !result) return;
        setDownloading("image");
        try {
            await downloadAsImage(docRef.current, String(result.totalCost));
        } finally {
            setDownloading("");
        }
    };

    return (
        <main className="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-24 max-w-screen-2xl">
            <header>
                <h3 className="font-heading font-black text-xl md:text-2xl xl:text-3xl uppercase">
                    Instant Quotes
                </h3>
                <h6 className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm capitalize">
                    Generate precise logistics cost estimations for high-capacity liquid
                    storage. Our real-time algorithm factors in terminal availability and
                    product-specific handling requirements.
                </h6>
            </header>
            <section className="flex md:flex-row flex-col md:justify-between gap-5 mt-10">
                <main className="space-y-5 p-4 border border-border w-full md:w-1/2">
                    <header className="flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            <Calculator className="size-4 md:size-4.5 xl:size-5 text-gold" />
                            <span className="font-mono text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wider">
                                Quote Request
                            </span>
                        </div>
                        <span className="bg-muted px-2 md:px-4 xl:px-6 py-1 font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                            Step 1 of 1
                        </span>
                    </header>

                    {/* Form */}

                    {/* Email */}
                    <RenderField label="Email Address" Icon={Sms}>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="operator@company.com"
                            className="pl-9"
                        />
                    </RenderField>

                    {/* Company */}
                    <RenderField label="Company Name" Icon={Building}>
                        <Input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Enter formal entity name"
                            className="pl-9"
                        />
                    </RenderField>

                    {/* Terminals */}
                    <RenderField label="Terminal" Icon={Buildings}>
                        <select
                            value={terminal}
                            onChange={(e) => setTerminal(e.target.value)}
                            className="py-3 pr-9 pl-9 border border-border focus:border-gold focus:outline-none w-full transition-all appearance-none"
                        >
                            <option value="" className="bg-background text-foreground">
                                Select Terminal
                            </option>
                            {terminals.map((t) => (
                                <option
                                    key={t.id}
                                    value={t.id}
                                    className="bg-background text-foreground"
                                >
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </RenderField>

                    {/* Products */}
                    <RenderField label="Products" Icon={Box}>
                        <select
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            className="py-3 pr-9 pl-9 border border-border focus:border-gold focus:outline-none w-full transition-all appearance-none"
                        >
                            <option value="" className="bg-background text-foreground">
                                Select Product
                            </option>
                            {products.map((p) => (
                                <option
                                    key={p.id}
                                    value={p.id}
                                    className="bg-background text-foreground"
                                >
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </RenderField>

                    {/* Quantity & Duration */}
                    <div className="gap-4 grid grid-cols-2 mb-5">
                        <RenderField label="Quantity in MT" Icon={WeightMeter}>
                            <Input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="0.00"
                                className="pl-9"
                            />
                        </RenderField>
                        <RenderField label="Storage Duration (Days)" Icon={Calendar}>
                            <Input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="30"
                                className="pl-9"
                            />
                        </RenderField>
                    </div>

                    {/* Submit */}
                    <Button
                        disabled={newQuote.isPending || !isValid}
                        onClick={handleSubmit}
                        className="flex justify-center items-center gap-x-2 disabled:opacity-40 hover:brightness-110 w-full font-display font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed"
                    >
                        {newQuote.isPending ? (
                            <Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                        ) : (
                            <Calculator className="size-4 md:size-4.5 xl:size-5" />
                        )}
                        {newQuote.isPending ? "Calculating..." : "Get Quote"}
                    </Button>

                    {/* Status line */}
                    <p className="mt-4 font-mono text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] text-center uppercase tracking-wider">
                        Algorithm v2.1 · Real-Time Terminal Sync
                    </p>
                </main>
                <main className="p-2 border border-border w-full md:w-1/2">
                    {result === null ?
                        <section className="flex flex-col justify-center items-center bg-background p-2 h-full text-center">
                            <div className="bg-muted mx-auto mb-2 p-3 w-fit text-muted-foreground">
                                <DocumentText1
                                    variant="Bold"
                                    className="size-6 md:size-6.5 xl:size-7"
                                />
                            </div>
                            <p>Quote Summary</p>
                            <h6 className="max-w-[35ch] text-[10px] text-muted-foreground md:text-[11px] xl:text-xs text-center">
                                Fill in the request form and click "Get Quote" to generate your
                                estimate
                            </h6>
                        </section>
                        :
                        <>
                            <section ref={docRef} className="bg-background p-2">
                                {/* Header */}
                                <header className="flex justify-between items-center mb-5">
                                    <div className="flex items-center gap-x-2">
                                        <Calculator className="size-4 md:size-4.5 xl:size-5 text-gold" />
                                        <span className="font-mono text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wider">
                                            Quote Summary
                                        </span>
                                    </div>
                                    <span className="flex items-center gap-x-1 bg-muted px-2 md:px-4 xl:px-6 py-1 font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                                        <Clock className="size-2 md:size-2.5 xl:size-3" />
                                        Validity: 72 Hours
                                    </span>
                                </header>

                                <main className="space-y-5">
                                    {/* Details grid */}
                                    <section className="gap-3 grid grid-cols-2">
                                        <RenderDetails label="Terminal" value={selectedTerminal.name} />
                                        <RenderDetails label="Product" value={selectedProduct.name} />
                                        <RenderDetails label="Quantity" value={quantity} />
                                        <RenderDetails label="Duration" value={duration} />
                                    </section>

                                    {/* Daily Rate */}
                                    <section className="flex justify-between items-center bg-muted p-4">
                                        <div className="flex items-center gap-x-2 text-muted-foreground">
                                            <TrendUp className="size-4 md:size-4.5 xl:size-5" />
                                            <h6 className="font-mono text-[8px] md:text-[9px] xl:text-[10px] uppercase">STORAGE RATE</h6>
                                        </div>
                                        <h2 className="font-heading font-black text-2xl md:text-3xl xl:text-4xl">USD{" "}{result.storageRate}<span className="font-body font-normal text-[8px] text-muted-foreground md:text-[9px] xl:text-[10px]"> / MT / Day</span></h2>
                                    </section>

                                    {/* Estimation */}
                                    <div className="bg-gold/20 p-4 border border-gold/50">
                                        <div className="flex items-center gap-x-2 mb-2 text-gold/70">
                                            <DollarSquare className="size-3 md:size-3.5 xl:size-4" />
                                            <span className="font-mono text-[9px] md:text-[10px] xl:text-[11px] uppercase tracking-wider">
                                                Estimated Storage Cost
                                            </span>
                                        </div>
                                        <p className="font-heading font-bold text-gold text-3xl md:text-4xl xl:text-5xl">
                                            USD{" "}
                                            {format(result.totalCost)}
                                        </p>
                                        <p className="mt-1.5 font-mono text-[9px] text-gold/70 md:text-[10px] xl:text-[11px] uppercase tracking-wider">
                                            Inclusive of terminal handling & product-specific surcharges
                                        </p>
                                    </div>
                                </main>
                            </section>

                            <section className="flex justify-between mt-8 p-2">
                                <Button onClick={handleDownloadImage} className="w-[48%]">
                                    {downloading === "image" ? (
                                        <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                                    ) : (
                                        <GalleryImport className="size-4 md:size-4.5 xl:size-5" />
                                    )}
                                    Download Image
                                </Button>
                                <Button variant="secondary" onClick={handleDownloadPdf} className="w-[48%]">
                                    {downloading === "pdf" ? (
                                        <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                                    ) : (
                                        <DocumentDownload className="size-4 md:size-4.5 xl:size-5" />
                                    )}
                                    Download PDF
                                </Button>
                            </section>
                        </>
                    }
                </main>
            </section>
        </main>
    );
};

export default Quote;

const RenderField = ({
    label,
    Icon,
    children,
}: {
    label: string;
    Icon: Icon;
    children: React.ReactNode;
}) => (
    <div className="space-y-1">
        <Label htmlFor={label} className="text-[10px] md:text-[11px] xl:text-xs">
            {label}
        </Label>
        <div className="relative">
            <Icon className="top-1/2 left-3 z-10 absolute w-3.5 h-3.5 -translate-y-1/2 pointer-events-none" />
            {children}
        </div>
    </div>
);

const RenderDetails = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-muted p-4">
        <span className="block mb-1 font-mono text-[8px] text-muted-foreground md:text-[9px] xl:text-[10px] uppercase tracking-wider">
            {label}
        </span>
        <span className="font-bold text-[11px] md:text-xs xl:text-sm">
            {value}
        </span>
    </div>
)
