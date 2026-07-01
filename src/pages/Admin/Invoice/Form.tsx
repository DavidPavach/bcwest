import { ClipboardText, SaveAdd } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import Invoice from "#/components/Invoice";
import { Overlay } from "#/components/Overlay";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useCreateInvoice, useUpdateInvoice } from "#/services/mutations";
import { SectionCard } from "../TSR/Form";
import KeyValuePairEditor from "../TSR/KeyValueEditor";
import InvoiceBreakdownEditor from "./BreakdownEditor";

const emptyForm = {
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    currency: "USD",
    billedTo: {},
    serviceCharge: {
        title: "",
        body: "",
        details: {},
    },
    breakdown: [{ label: "", amount: 0 }],
    bankDetails: {},
    walletDetails: {
        paymentUrl: "",
    },
};

const Form = ({
    id,
    onClose,
    oldInvoice,
    isNew = true,
}: {
    id?: string;
    oldInvoice?: Invoice;
    onClose: () => void;
    isNew?: boolean;
}) => {
    const [preview, setPreview] = useState<boolean>(false);
    const [form, setForm] = useState<InvoicePayload>(
        oldInvoice ? { ...oldInvoice } : { ...emptyForm },
    );

    // Functions
    const togglePreview = () => setPreview((p) => !p);

    const set = (
        field: keyof InvoicePayload,
        value: InvoicePayload[keyof InvoicePayload],
    ) =>
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

    const createInvoice = useCreateInvoice();
    const updateInvoice = useUpdateInvoice();

    const mutation = isNew ? createInvoice : updateInvoice;

    const handleSave = () => {
        if (isNew) {
            createInvoice.mutate(
                { data: form },
                {
                    onSuccess: () => {
                        toast.success("Your Invoice was created successfully.");
                        onClose();
                    },
                    onError: ({ message }) => {
                        toast.error(message || "Failed. Please try again.");
                    },
                },
            );
        } else {
            if (!id) return toast.error("Something Went Wrong Kindly Restart");
            updateInvoice.mutate(
                { data: { id, data: form } },
                {
                    onSuccess: () => {
                        toast.success("The Invoice was updated successfully.");
                        onClose();
                    },
                    onError: ({ message }) => {
                        toast.error(message || "Failed. Please try again.");
                    },
                },
            );
        }
    };

    return (
        <>
            {preview && (
                <Overlay
                    open={preview}
                    onClose={togglePreview}
                    classNames="max-w-7xl mx-auto border border-border"
                >
                    <Invoice
                        invoice={{
                            ...form,
                            id: "BCWEST-INV-001",
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        }}
                    />
                </Overlay>
            )}
            {/* Header */}
            <header className="top-0 z-5 sticky flex justify-between gap-y-2 bg-background px-4 md:px-5 xl:px-6 py-4 border-border border-b">
                <div>
                    <h1 className="font-display font-bold text-base md:text-lg xl:text-xl uppercase tracking-wide">
                        {isNew
                            ? "Create Invoice"
                            : `Edit ${form.invoiceNumber || "INVOICE"}`}
                    </h1>
                    <p className="font-mono text-[10px] text-muted-foreground md:text-[11px] md:text-xs uppercase">
                        {isNew ? "New Invoice" : "Modify existing Invoice"}
                    </p>
                </div>
                <div className="flex gap-x-2">
                    <Button
                        variant="destructive"
                        onClick={onClose}
                        className="font-mono text-[11px] md:text-xs xl:text-sm uppercase"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={togglePreview}
                        className="font-display font-bold text-[11px] md:text-xs xl:text-sm uppercase"
                    >
                        <ClipboardText className="size-3 md:size-3.5 xl:size-4" />
                        Preview
                    </Button>
                </div>
            </header>

            <main className="space-y-5 w-full">
                {/* Basic Information */}
                <SectionCard title="Basic Information">
                    <section className="gap-4 grid md:grid-cols-2">
                        <div className="space-y-1">
                            <Label htmlFor="invoiceNumber">
                                Invoice Number <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="invoiceNumber"
                                value={form.invoiceNumber}
                                onChange={(e) => set("invoiceNumber", e.target.value)}
                                placeholder="INV-2026-0001"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="currency">Currency </Label>
                            <Input
                                id="currency"
                                value={form.currency}
                                onChange={(e) => set("currency", e.target.value)}
                                placeholder="USD"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="issueDate">Issue Date</Label>
                            <Input
                                id="issueDate"
                                type="date"
                                value={form.issueDate}
                                onChange={(e) => set("issueDate", e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={form.dueDate}
                                onChange={(e) => set("dueDate", e.target.value)}
                            />
                        </div>
                    </section>
                </SectionCard>

                {/* Billing Information */}
                <SectionCard title="Billed To">
                    <KeyValuePairEditor
                        title="Recipient Details"
                        value={form.billedTo}
                        onChange={(v) => set("billedTo", v)}
                    />
                </SectionCard>

                {/* Service Charge */}
                <SectionCard title="Service Charge">
                    <section className="space-y-5">
                        <div className="space-y-1">
                            <Label>Title</Label>
                            <Input
                                value={form.serviceCharge.title}
                                onChange={(e) =>
                                    set("serviceCharge", {
                                        ...form.serviceCharge,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Tank Storage Charge"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Description </Label>
                            <textarea
                                value={form.serviceCharge.body}
                                onChange={(e) =>
                                    set("serviceCharge", {
                                        ...form.serviceCharge,
                                        body: e.target.value,
                                    })
                                }
                                className="bg-background p-3 border border-border focus:border-gold focus:outline-0 w-full min-h-36 resize-none"
                                placeholder="Service Description..."
                            />
                        </div>

                        <KeyValuePairEditor
                            title="Service Details"
                            value={form.serviceCharge.details}
                            onChange={(v) =>
                                set("serviceCharge", { ...form.serviceCharge, details: v })
                            }
                        />
                    </section>
                </SectionCard>

                {/* Invoice Breakdown */}
                <SectionCard title="Cost Breakdown">
                    <InvoiceBreakdownEditor
                        value={form.breakdown}
                        onChange={(v) => set("breakdown", v)}
                    />
                </SectionCard>

                {/* Bank Details */}
                <SectionCard title="Bank Details">
                    <KeyValuePairEditor
                        title="Bank Information"
                        value={form.bankDetails}
                        onChange={(v) => set("bankDetails", v)}
                    />
                </SectionCard>

                {/* Wallet Details */}
                <SectionCard title="Wallet Details">
                    <KeyValuePairEditor
                        title="Crypto / Wallet Information"
                        value={form.walletDetails}
                        onChange={(v) => set("walletDetails", v)}
                    />
                </SectionCard>

                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={mutation.isPending}
                    className="mt-4 w-full font-display font-bold text-[11px] md:text-xs xl:text-sm uppercase"
                >
                    {mutation.isPending ? (
                        <Loader2 className="size-3 md:size-3.5 xl:size-4 animate-spin" />
                    ) : (
                        <SaveAdd className="size-3 md:size-3.5 xl:size-4" />
                    )}
                    {isNew ? "Create Invoice" : "Save Changes"}
                </Button>
            </main>
        </>
    );
};

export default Form;
