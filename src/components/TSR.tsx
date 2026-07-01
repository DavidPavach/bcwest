import { DocumentDownload, GalleryImport } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-fox-toast";

import { formatCurrency, formatDate, formatOnlyDate, toWords } from "#/utils/format";
import { downloadAsImage, downloadAsPdf } from "#/utils/generate";
import KeyValueBlock from "./KeyValueBlock";
import LineItems from "./LineItems";
import TankDetails from "./TankDetails";
import { Button } from "./ui/button";

const TSR = ({ tsr }: { tsr: TSR }) => {
    const docRef = useRef<HTMLDivElement | null>(null);
    const [downloading, setDownloading] = useState<string>("");

    // Functions
    const handleDownloadPdf = async () => {
        toast.info("Downloading PDF...");

        if (!docRef.current || !tsr) return;
        setDownloading("pdf");
        try {
            await downloadAsPdf(docRef.current, tsr.tsrNumber);
        } finally {
            setDownloading("");
        }
    };

    const handleDownloadImage = async () => {
        toast.info("Downloading Image...");

        if (!docRef.current || !tsr) return;
        setDownloading("image");
        try {
            await downloadAsImage(docRef.current, tsr.tsrNumber);
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
                <header className="flex justify-between items-start pb-3 border-border border-b-2">
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
                    <div className="text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] text-right leading-relaxed">
                        <div>2900 - 201 Portage Avenue</div>
                        <div>Winnipeg MB R3B 3K6</div>
                        <div>Tel: 204-958-5315</div>
                        <div>Email: info@bcwestterminals.ca</div>
                        <div>Co. Reg. No.(Numéro de la société): 341779-4</div>
                    </div>
                </header>

                {/* Title + Metadata */}
                <section className="flex justify-between items-end mt-4 mb-4">
                    <h1 className="font-bold text-[18px] md:text-[20px] xl:text-[22px] uppercase tracking-wide">
                        Tank Storage Receipt
                    </h1>
                    <div className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs text-right leading-relaxed">
                        <div>
                            <span className="font-semibold">Receipt No.:</span>{" "}
                            {tsr.tsrNumber}
                        </div>
                        <div>
                            <span className="font-semibold">Issue Date:</span>{" "}
                            {formatDate(tsr.issuedDate)}
                        </div>
                        <div>
                            <span className="font-semibold">Issue Time:</span>{" "}
                            {tsr.issuedTime} UTC
                        </div>
                    </div>
                </section>

                {/* Depositor + Terminal Details */}
                <div className="gap-5 grid sm:grid-cols-2 mb-3">
                    <KeyValueBlock
                        title="Depositor / Product Owner"
                        data={tsr.depositor}
                    />
                    <KeyValueBlock title="Terminal Details" data={tsr.terminalDetails} />
                </div>

                {/* Product Info + Inventory Position */}
                <div className="gap-5 grid sm:grid-cols-2 mb-3">
                    <KeyValueBlock title="Product Information" data={tsr.productInfo} />
                    <KeyValueBlock
                        title="Inventory Position"
                        data={tsr.inventoryPosition}
                    />
                </div>

                {/* Storage Validity + Storage Summary */}
                <div className="gap-5 grid sm:grid-cols-2 mb-4">
                    <KeyValueBlock title="Storage Validity" data={tsr.storageValidity} />
                    <KeyValueBlock
                        title="Receipt / Payment Details"
                        data={tsr.storageSummary}
                    />
                </div>

                {/* Tank Details */}
                {tsr.tankDetails && tsr.tankDetails.length > 0 && (
                    <div className="mb-4">
                        <TankDetails tanks={tsr.tankDetails} />
                    </div>
                )}

                {/* Line Items / Charges */}
                <div className="mb-2">
                    <div className="mb-1.5 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide">
                        Charges Summary
                    </div>
                    <LineItems items={tsr.lineItems || []} currency={tsr.currency} />
                </div>

                {/* Total Row */}
                <div className="flex justify-end mb-4">
                    <div className="flex items-center border border-border">
                        <div className="bg-muted/10 px-4 py-2 font-bold text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase tracking-wide">
                            Total Paid ({tsr.currency})
                        </div>
                        <div className="px-4 py-2 font-bold text-[11px] xl:text-[14px] md:text-xs">
                            {formatCurrency(tsr.totalAmount)}
                        </div>
                    </div>
                </div>

                {/* Amount in Words + Paid Badge */}
                <section className="gap-3 grid sm:grid-cols-2 mb-4">
                    <div className="border border-border">
                        <div className="bg-green-100 dark:bg-green-900 px-3 py-1.5 font-bold text-[11px] text-green-600 dark:text-green-300 md:text-xs xl:text-sm uppercase tracking-wide">
                            Paid In Full
                        </div>
                        <div className="px-3 py-2 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-relaxed">
                            This is to confirm that we have received full payment for the
                            above storage services as per invoice referenced above. Thank you
                            for your business.
                        </div>
                    </div>
                    <div className="border border-border">
                        <div className="bg-muted px-3 py-1.5 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide">
                            Amount in Words
                        </div>
                        <div className="px-3 py-2 font-medium text-[10px] text-muted-foreground md:text-[11px] xl:text-xs capitalize">
                            {toWords(tsr.totalAmount)} {tsr.currency}
                        </div>
                    </div>
                </section>

                {/* Signature */}
                <section className="flex flex-col items-end mb-4 text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px]">
                    <p className="">Authorized Signatories</p>
                    <main className="flex items-center gap-x-5">
                        <div className="max-w-52 sm:max-w-full">
                            <img
                                src="/signature_original.png"
                                alt="Signature"
                                className="mt-2 mb-1 h-12"
                            />

                            <div className="space-y-0.5 pt-1 border-border border-t">
                                <p>
                                    <span className="font-semibold text-foreground">Name:</span>{" "}
                                    Bolanos Castro Silva Graciela
                                </p>
                                <p>
                                    <span className="font-semibold text-foreground">Title:</span>{" "}
                                    Group Executive Vice President - Global Operations.
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            {tsr.signatureUrl.trim() ? (
                                <img
                                    src={tsr.signatureUrl}
                                    alt="Signature"
                                    className="mt-2 mb-1 ml-auto h-12"
                                    style={{ objectFit: "contain" }}
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <div className="mb-1 ml-auto h-12" />
                            )}
                            <div className="space-y-0.5 pt-1 border-border border-t">
                                <p>
                                    <span className="font-semibold text-foreground">Name:</span>{" "}
                                    {tsr.signatureName || "Micheal Boroughs"}
                                </p>
                                <p>
                                    <span className="font-semibold text-foreground">Title:</span>{" "}
                                    {tsr.signatureTitle || "Terminal Manager"}
                                </p>
                            </div>
                        </div>
                    </main>
                </section>

                {/* Verification + System Info */}
                <section className="gap-3 grid sm:grid-cols-2 mb-3 pt-3 border-border border-t">
                    <div>
                        <header className="mb-1 font-bold text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wide">
                            VERIFICATION
                        </header>
                        <div className="flex items-center gap-x-2">
                            <img
                                src="/tsr_qr.png"
                                alt="TSR QR Code"
                                className="size-10 md:size-12 xl:size-14"
                            />
                            <div className="text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] leading-relaxed">
                                <div>
                                    Scan the QR code or visit the link below to verify this
                                    receipt.
                                </div>
                                <div className="font-semibold text-blue-600 dark:text-blue-400">
                                    https://www.bcwestterminal.ca/verification?verify=tsr
                                </div>
                                <div>Receipt No.: {tsr.tsrNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <header className="mb-1 font-bold text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wide">
                            System Information
                        </header>
                        <div className="text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] leading-relaxed">
                            <div>
                                <span className="font-semibold text-foreground">
                                    Generated By:
                                </span>{" "}
                                BCWEST TERMINAL FREIGHT SERVICES INC.
                            </div>
                            <div>
                                <span className="font-semibold text-foreground">
                                    Generation Time:
                                </span>{" "}
                                {formatOnlyDate(tsr.issuedDate)} {tsr.issuedTime} UTC
                            </div>
                            <div>
                                <span className="font-semibold text-foreground">
                                    Document Type:
                                </span>{" "}
                                TSR
                            </div>
                            <div>
                                <span className="font-semibold text-foreground">
                                    System Reference:
                                </span>{" "}
                                {tsr.tsrNumber}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Declaration */}
                <section className="mb-3 pt-3 border-border border-t text-[10px] md:text-[11px] xl:text-xs">
                    <header className="mb-1 font-bold uppercase tracking-wide">
                        Storage Declaration
                    </header>
                    <p className="my-2">
                        This Tank Storage Receipt (TSR) certifies that the above-described
                        product has been recorded under the contracted storage allocation of
                        BCWEST Terminal Freight Services Inc. at the designated terminal and
                        is maintained in accordance with the applicable storage
                        arrangements.
                    </p>
                    <p>
                        The quantity stated herein reflects the recorded storage inventory
                        as of the date and time of issuance of this receipt. All cargo
                        handling, transfer, release, and other operational activities shall
                        be subject to authorized instructions, terminal scheduling,
                        applicable contractual obligations, regulatory requirements, and the
                        terms of the applicable Storage Agreement.
                    </p>
                </section>

                {/* Remarks */}
                <section className="mb-3 pt-3 border-border border-t text-[10px] md:text-[11px] xl:text-xs">
                    <header className="mb-1 font-bold uppercase tracking-wide">
                        Remarks
                    </header>
                    <ul className="pl-4 md:pl-6 xl:pl-8 list-disc">
                        <li>
                            This Tank Storage Receipt is issued for inventory, storage and
                            operational reference purposes and is subject to the applicable
                            Storage Agreement and terminal operational procedures.
                        </li>
                        <li>
                            Product release, transfer or cargo nomination shall be subject to
                            authorized instructions, terminal scheduling and operational
                            availability.
                        </li>
                        <li>
                            The QR code provided on this receipt is intended for document
                            verification. If this receipt cannot be successfully verified, the
                            holder should contact BCWEST Terminal Freight Services Inc. before
                            relying upon or acting on its contents.
                        </li>
                        <li>
                            BCWEST Terminal Freight Services Inc. shall not be responsible for
                            any loss, damage, claim, or liability arising from the
                            unauthorized alteration, misuse, duplication, or reliance upon an
                            unverified or fraudulent copy of this Tank Storage Receipt.
                        </li>
                    </ul>
                </section>

                {/* Disclaimer */}
                <div className="pt-2 border-border border-t text-[8px] text-muted-foreground md:text-[9px] xl:text-[10px] text-center leading-relaxed">
                    This is a computer-generated document. Electronic signatures are
                    applied and are valid. Thank you for your payment, for any enquiries
                    please contact our billing department
                </div>
            </main>
        </>
    );
};

export default TSR;
