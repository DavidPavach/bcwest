import { ClipboardText, SaveAdd } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import { Overlay } from "#/components/Overlay";
import TSR from "#/components/TSR";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useCreateTSR, useUpdateTSR } from "#/services/mutations";
import KeyValuePairEditor from "./KeyValueEditor";
import LineItemsEditor from "./LineItemEditor";
import TankDetailsEditor from "./TankDetailsEditor";

const emptyForm = {
    tsrNumber: "",
    depositor: {},
    terminalDetails: {},
    productInfo: {},
    inventoryPosition: {},
    storageValidity: {},
    storageSummary: {},
    lineItems: [{ description: "", quantityText: "", rateText: "", amount: 0 }],
    tankDetails: [],
    totalAmount: 0,
    signatureUrl: "",
    signatureName: "",
    signatureTitle: "",
    currency: "USD",
    issuedDate: "",
    issuedTime: "",
};

type FormProps = {
    id?: string;
    oldTsr?: TSR;
    isNew?: boolean;
    onClose: () => void;
};
const Form = ({ id, oldTsr, isNew = true, onClose }: FormProps) => {

    const [preview, setPreview] = useState<boolean>(false);
    const [form, setForm] = useState<TsrPayload>(oldTsr ? { ...oldTsr } : { ...emptyForm });

    const totalAmount = (form.lineItems || []).reduce(
        (s, item) => s + (Number(item.amount) || 0),
        0,
    );

    // Functions
    const set = (
        field: string,
        value:
            | number
            | string
            | Record<string, number | string>
            | TsrItem[]
            | TsrTank[],
    ) => setForm((f) => ({ ...f, [field]: value }));
    const togglePreview = () => setPreview((prev) => !prev);

    const createTSR = useCreateTSR();
    const updateTSR = useUpdateTSR();

    const mutation = isNew ? createTSR : updateTSR;

    const handleSave = () => {
        if (isNew) {
            createTSR.mutate(
                { data: form },
                {
                    onSuccess: () => {
                        toast.success("TSR was created successfully.");
                        onClose();
                    },
                    onError: ({ message }) => {
                        toast.error(message || "Failed. Please try again.");
                    },
                },
            );
        } else {
            if (!id) return toast.error("Something Went Wrong Kindly Restart");
            updateTSR.mutate(
                { data: { id, data: form } },
                {
                    onSuccess: () => {
                        toast.success("TSR was updated successfully.");
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
                    <TSR tsr={{ ...form, id: "BCWEST-ID", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }} />
                </Overlay>
            )}
            {/* Header */}
            <header className="top-0 z-5 sticky flex justify-between gap-y-2 bg-background px-4 md:px-5 xl:px-6 py-4 border-border border-b">
                <div>
                    <h1 className="font-display font-bold text-base md:text-lg xl:text-xl uppercase tracking-wide">
                        {isNew ? "Create TSR" : `Edit ${form.tsrNumber || "TSR"}`}
                    </h1>
                    <p className="font-mono text-[10px] text-muted-foreground md:text-[11px] md:text-xs uppercase">
                        {isNew ? "New Tank Storage Receipt" : "Modify existing TSR"}
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
            <section className="space-y-5">
                {/* Basic Info */}
                <SectionCard title="Basic Information">
                    <div className="gap-4 grid grid-cols-2">
                        <div className="space-y-1">
                            <Label htmlFor="tsrNumber">
                                TSR Number<span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="tsrNumber"
                                type="text"
                                value={form.tsrNumber}
                                onChange={(e) => set("tsrNumber", e.target.value)}
                                placeholder="TSR-2024-06-000789"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="currency">Currency</Label>
                            <Input
                                id="currency"
                                type="text"
                                value={form.currency}
                                onChange={(e) => set("currency", e.target.value)}
                                placeholder="USD"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="date">Issued Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={form.issuedDate}
                                onChange={(e) => set("issuedDate", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="time">Issued Time</Label>
                            <Input
                                id="time"
                                type="time"
                                value={form.issuedTime}
                                onChange={(e) => set("issuedTime", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="signatureName">Signature Name</Label>
                            <Input
                                id="signatureName"
                                type="text"
                                value={form.signatureName}
                                onChange={(e) => set("signatureName", e.target.value)}
                                placeholder="Helen Burroughs"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="signatureTitle">Signature Title</Label>
                            <Input
                                id="signatureTitle"
                                type="text"
                                value={form.signatureTitle}
                                onChange={(e) => set("signatureTitle", e.target.value)}
                                placeholder="Terminal Manager"
                            />
                        </div>
                        <div className="space-y-1 col-span-2">
                            <Label htmlFor="signature">Signature URL</Label>
                            <Input
                                id="signature"
                                type="url"
                                value={form.signatureUrl}
                                onChange={(e) => set("signatureUrl", e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* Key-Value Sections */}
                <SectionCard title="Depositor & Terminal">
                    <div className="gap-5 grid sm:grid-cols-2">
                        <KeyValuePairEditor
                            title="Depositor"
                            value={form.depositor}
                            onChange={(v) => set("depositor", v)}
                        />
                        <KeyValuePairEditor
                            title="Terminal Details"
                            value={form.terminalDetails}
                            onChange={(v) => set("terminalDetails", v)}
                        />
                    </div>
                </SectionCard>

                <SectionCard title="Product & Inventory">
                    <div className="gap-5 grid sm:grid-cols-2">
                        <KeyValuePairEditor
                            title="Product Information"
                            value={form.productInfo}
                            onChange={(v) => set("productInfo", v)}
                        />
                        <KeyValuePairEditor
                            title="Inventory Position"
                            value={form.inventoryPosition}
                            onChange={(v) => set("inventoryPosition", v)}
                        />
                    </div>
                </SectionCard>

                <SectionCard title="Storage Validity & Receipt / Payment Details">
                    <div className="gap-5 grid sm:grid-cols-2">
                        <KeyValuePairEditor
                            title="Storage Validity"
                            value={form.storageValidity}
                            onChange={(v) => set("storageValidity", v)}
                        />
                        <KeyValuePairEditor
                            title="Receipt / Payment Details"
                            value={form.storageSummary}
                            onChange={(v) => set("storageSummary", v)}
                        />
                    </div>
                </SectionCard>

                {/* Line Items */}
                <SectionCard title="Charges Summary">
                    <LineItemsEditor
                        items={form.lineItems}
                        onChange={(v) => set("lineItems", v)}
                    />
                    <div className="flex justify-end mt-4 pt-3 border-border border-t">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wider">
                                Total Amount:
                            </span>
                            <span className="font-mono font-bold text-base md:text-lg xl:text-xl">
                                {totalAmount.toLocaleString()} {form.currency}
                            </span>
                        </div>
                    </div>
                </SectionCard>

                {/* Tank Details */}
                <SectionCard title="Tank Details">
                    <TankDetailsEditor
                        tanks={form.tankDetails}
                        onChange={(v) => set("tankDetails", v)}
                    />
                </SectionCard>

                <div className="space-y-1 p-2 md:p-3 xl:p-4">
                    <Label htmlFor="totalAmount">Total Amount</Label>
                    <Input
                        id="totalAmount"
                        type="number"
                        value={form.totalAmount}
                        onChange={(e) => set("totalAmount", parseInt(e.target.value, 10))}
                    />
                </div>
            </section>
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
                {isNew ? "Create TSR" : "Save Changes"}
            </Button>
        </>
    );
};

export default Form;

export function SectionCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mt-4 p-2 md:p-3 xl:p-4">
            <h3 className="mb-4 font-mono text-[10px] text-gold md:text-[11px] xl:text-xs uppercase tracking-wider">
                {title}
            </h3>
            {children}
        </div>
    );
}
