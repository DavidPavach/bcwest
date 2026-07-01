import { DocumentDownload, GalleryImport } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { toast } from "react-fox-toast";

import {
    format,
    formatOnlyDate,
    toWords,
} from "#/utils/format";
import { downloadAsImage, downloadAsPdf } from "#/utils/generate";
import { Button } from "./ui/button";

type UrlQrCodeProps = {
    url: string;
};

export function UrlQrCode({ url }: UrlQrCodeProps) {
    return <QRCodeSVG value={url} size={60} marginSize={2} />;
}

const Invoice = ({ invoice }: { invoice: Invoice }) => {

    const docRef = useRef<HTMLDivElement | null>(null);
    const [downloading, setDownloading] = useState<string>("");

    const billedTo = Object.entries(invoice.billedTo || {});
    const serviceCharge = Object.entries(invoice.serviceCharge.details || {});
    const breakDown = invoice.breakdown;
    const totalAmount = breakDown.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0,
    );
    const walletDetails = Object.entries(invoice.walletDetails);
    const bankDetails = Object.entries(invoice.bankDetails);

    // Functions
    const handleDownloadPdf = async () => {
        toast.info("Downloading PDF...");

        if (!docRef.current || !invoice) return;
        setDownloading("pdf");
        try {
            await downloadAsPdf(docRef.current, invoice.invoiceNumber);
        } finally {
            setDownloading("");
        }
    };

    const handleDownloadImage = async () => {
        toast.info("Downloading Image...");

        if (!docRef.current || !invoice) return;
        setDownloading("image");
        try {
            await downloadAsImage(docRef.current, invoice.invoiceNumber);
        } finally {
            setDownloading("");
        }
    };

    return (
        <>
            {/* Download Actions */}
            <section className="top-0 z-2 sticky flex justify-end gap-x-2 md:gap-x-3 xl:gap-x-5 bg-background mb-4 p-4 md:p-6 xl:p-8 text-[11px] md:text-xs xl:text-sm">
                <Button onClick={handleDownloadImage}>
                    {downloading === "image" ? (
                        <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                    ) : (
                        <GalleryImport className="size-4 md:size-4.5 xl:size-5" />
                    )}
                    Download Image
                </Button>
                <Button variant="secondary" onClick={handleDownloadPdf}>
                    {downloading === "pdf" ? (
                        <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                    ) : (
                        <DocumentDownload className="size-4 md:size-4.5 xl:size-5" />
                    )}
                    Download PDF
                </Button>
            </section>
            <main ref={docRef} className="bg-background p-4 md:p-6 xl:p-8 border border-border">
                {/* Header */}
                <header className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-y-5 sm:gap-y-0 pb-3">
                    <div className="flex gap-x-2">
                        <img
                            src="/logo_light.png"
                            alt="logo"
                            className="dark:hidden size-7 md:size-9 xl:size-11"
                        />
                        <img
                            src="/logo_dark.png"
                            alt="logo"
                            className="hidden dark:block size-8 md:size-9 xl:size-10"
                        />
                        <div>
                            <div className="font-bold text-[14px] md:text-[15px] xl:text-base tracking-wide">
                                BCWEST TERMINAL FREIGHT SERVICES INC.
                            </div>
                            <div className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                Tank Storage & Logistics Services
                            </div>
                        </div>
                    </div>
                    <div className="text-[9px] text-primary md:text-[10px] xl:text-[11px] sm:text-right leading-relaxed">
                        <p>Invoice</p>
                        <p className="text-foreground text-lg md:text-xl xl:text-2xl">
                            {invoice.invoiceNumber}
                        </p>
                        <div className="flex items-center gap-x-2 bg-primary/20 px-2 py-1">
                            <div className="bg-primary size-1 shrink-0" />
                            <p>ELECTRONICALLY GENERATED - NO SIGNATURE REQUIRED</p>
                        </div>
                    </div>
                </header>

                <hr className="my-6 border-border border-t-2" />

                {/* Billing Section */}
                <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border border-border text-[11px] md:text-xs xl:text-sm">
                    {/* Billing Details */}
                    <div className="p-4 border-border md:border-r border-b md:border-b-0">
                        <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">
                            Billed To
                        </h6>

                        <div className="space-y-2 mt-4">
                            {billedTo.length === 0 ? (
                                <p className="text-muted-foreground italic">
                                    No billing details
                                </p>
                            ) : (
                                billedTo.map(([key, value]) => (
                                    <div key={key} className="flex items-start gap-3">
                                        <span className="min-w-28 font-semibold text-muted-foreground">
                                            {key}
                                        </span>
                                        <span className="flex-1 wrap-break-word">{value}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex sm:flex-row flex-col">
                        {/* Issue Date */}
                        <div className="flex-1 p-4 border-border sm:border-r border-b sm:border-b-0">
                            <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">
                                Issue Date
                            </h6>
                            <p className="mt-3 font-display font-bold text-primary text-base md:text-lg xl:text-xl">
                                {formatOnlyDate(invoice.issueDate)}
                            </p>
                        </div>

                        {/* Due Date */}
                        <div className="flex-1 p-4">
                            <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">
                                Due Date
                            </h6>
                            <p className="mt-3 font-display font-bold text-primary text-base md:text-lg xl:text-xl">
                                {formatOnlyDate(invoice.dueDate)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Service Charge Section */}
                {serviceCharge.length > 0 && (
                    <>
                        {/* Service Charge Line  */}
                        <section className="my-6">
                            <div className="flex items-center gap-x-2">
                                <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider shrink-0">
                                    Service Charge
                                </h6>
                                <hr className="border-border border-t w-full" />
                            </div>
                        </section>

                        <section className="bg-primary/20 p-4 border border-primary/50">
                            <h1 className="font-semibold text-base md:text-lg xl:text-xl">
                                {invoice.serviceCharge.title}
                            </h1>
                            <p className="mt-2 sm:max-w-4/5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                {invoice.serviceCharge.body}
                            </p>

                            <div className="flex md:flex-row flex-col bg-background mt-4 border border-border">
                                {serviceCharge.map(([key, value], index) => (
                                    <div
                                        key={key}
                                        className={`flex-1 p-4 ${index !== serviceCharge.length - 1
                                            ? "border-b md:border-b-0 md:border-r border-border"
                                            : ""
                                            }`}
                                    >
                                        <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">
                                            {key}
                                        </h6>
                                        <p className="mt-2 font-display font-semibold text-base md:text-lg xl:text-xl wrap-break-word">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* Break Down Section */}
                {breakDown.length > 0 && (
                    <section className="space-y-3 mt-4 ml-auto w-fit">
                        {breakDown.map((value) => (
                            <div
                                key={value.label}
                                className="flex justify-between gap-x-5 py-2 border-border border-b"
                            >
                                <p className="text-muted-foreground">{value.label}</p>
                                <p className="text-right">
                                    {format(value.amount)} {invoice.currency}
                                </p>
                            </div>
                        ))}
                        <div className="flex justify-between items-center bg-primary mt-2 p-4 w-full font-semibold text-primary-foreground">
                            <h6 className="text-[11px] md:text-xs xl:text-sm">
                                TOTAL DUE ({invoice.currency})
                            </h6>
                            <p className="font-display text-xl md:text-2xl xl:text-3xl">
                                {format(totalAmount)}
                            </p>
                        </div>
                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs italic capitalize">
                            {toWords(totalAmount)} {invoice.currency}
                        </p>
                    </section>
                )}

                {/* Payment Methods */}

                {/* Payment Method Line  */}
                <section className="my-6">
                    <div className="flex items-center gap-x-2">
                        <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider shrink-0">
                            Accepted Payment Methods
                        </h6>
                        <hr className="border-border border-t w-full" />
                    </div>
                </section>

                <section className="flex md:flex-row flex-col md:justify-between gap-y-5 md:gap-y-0">
                    <div className="p-2 md:p-3 xl:p-4border border-border md:w-[48%] text-[11px] md:text-xs xl:text-sm">
                        <p className="font-semibold text-xs md:text-sm xl:text-base">
                            SWIFT Wire Transfer
                        </p>
                        <div className="space-y-2 mt-2">
                            {bankDetails.map(([key, value]) => (
                                <div key={key} className="flex justify-between gap-x-5">
                                    <span className="text-muted-foreground shrink-0">{key}</span>
                                    <span className="font-mono text-right break-all">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3 p-2 md:p-3 xl:p-4 border border-border md:w-[48%]">
                        <p className="font-semibold text-xs md:text-sm xl:text-base">
                            Cryptocurrency Transfer
                        </p>
                        <div className="space-y-2 mt-2">
                            {walletDetails
                                .filter(([key]) => key !== "paymentUrl")
                                .map(([key, value]) => (
                                    <div key={key} className="flex justify-between gap-x-5">
                                        <span className="text-muted-foreground shrink-0">{key}</span>
                                        <span className="font-mono text-right break-all">{value}</span>
                                    </div>
                                ))}
                        </div>
                        {walletDetails.some(([key]) => key === "paymentUrl") && (
                            <div className="flex justify-between items-center">
                                <p className="text-muted-foreground">QR CODE</p>
                                <UrlQrCode url={String(walletDetails.find(([key]) => key === "paymentUrl")?.[1] ?? "")} />
                            </div>
                        )}
                    </div>
                </section>

                {/* Payment Authorization */}

                {/* Payment Authorization Line  */}
                <section className="my-6">
                    <div className="flex items-center gap-x-2">
                        <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider shrink-0">
                            PAYMENT AUTHORIZATION
                        </h6>
                        <hr className="border-border border-t w-full" />
                    </div>
                </section>

                <section className="p-4 border border-border text-[10px] md:text-[11px] xl:text-xs">
                    <header className="mb-1 font-semibold uppercase">
                        Payment Authorization
                    </header>
                    <h6 className="text-muted-foreground">
                        The Beneficiary bank account listed on this invoice are designated payment accounts authorized to receive funds on behalf of BCWEST Terminal and Freight Services. Payment to these accounts constitutes full payment of this invoice.
                    </h6>
                </section>

                {/* Notes Section */}

                {/* Notes Line  */}
                <section className="my-6">
                    <div className="flex items-center gap-x-2">
                        <h6 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider shrink-0">
                            NOTES
                        </h6>
                        <hr className="border-border border-t w-full" />
                    </div>
                </section>

                <section className="p-4 border border-border text-[10px] md:text-[11px] xl:text-xs">
                    <header className="mb-1 font-semibold uppercase">
                        Notes
                    </header>
                    <ul className="pl-4 text-muted-foreground list-disc">
                        <li>Payment is due within fourteen (14) calendar days from the invoice date unless otherwise agreed in writing.</li>
                        <li>Late payments may be subject to a 1.5% monthly surcharge in accordance with the applicable agreement.</li>
                        <li>Any invoice discrepancies or disputes should be submitted in writing within seven (7) calendar days from the invoice date.</li>
                        <li>All services are governed by the applicable Storage Agreement, Charter Agreement, or other executed service contract.</li>
                        <li>Storage charges, charter fees, and other applicable service costs shall continue in accordance with the governing agreement until completion or termination of the contracted services.</li>
                        <li>Please quote the invoice number when making payment or in all related correspondence.</li>
                        <li>For billing enquiries, please contact billing@bcwestterminals.ca, quote the invoice number in all correspondence.</li>
                    </ul>
                </section>

                {/* Disclaimer */}
                <div className="pt-4 border-border border-t text-[8px] text-muted-foreground md:text-[9px] xl:text-[10px] text-center leading-relaxed">
                    This Invoice was <span className="font-semibold text-foreground">system-generated</span> by BCWEST Billing Engine and requires no physical signature or stamp to be valid.
                </div>
            </main>
        </>
    );
};

export default Invoice;
