import { AddSquare, CloseSquare } from "iconsax-reactjs";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

type Props = {
    value: InvoiceLineItem[];
    onChange: (items: InvoiceLineItem[]) => void;
};

export default function InvoiceBreakdownEditor({
    value,
    onChange,
}: Props) {
    const updateItem = (index: number, field: keyof InvoiceLineItem, fieldValue: string | number) => {
        const next = [...value];
        next[index] = {
            ...next[index],
            [field]: field === "amount" ? Number(fieldValue) || 0 : fieldValue,
        };
        onChange(next);
    };

    const addItem = () => {
        onChange([...value, { label: "", amount: 0 }]);
    };

    const removeItem = (index: number) => {
        if (value.length === 1) {
            onChange([{ label: "", amount: 0 }]);
            return;
        }
        onChange(value.filter((_, i) => i !== index));
    };

    const total = value.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0,
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-mono text-[10px] text-gold md:text-[11px] xl:text-xs uppercase tracking-wider">
                        Invoice Breakdown
                    </p>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Add all invoice cost items.
                    </p>
                </div>

                <Button type="button" onClick={addItem} className="flex items-center gap-2 text-[10px] md:text-[11px] xl:text-xs">
                    <AddSquare className="size-3 md:size-3.5 xl:size-4" />
                    Add Item
                </Button>
            </div>

            <div className="space-y-3">
                {value.map((item, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <>
                    <div key={`break_down_${index}`} className="space-y-3">
                        <div className="items-end gap-3 grid grid-cols-12">
                            <div className="space-y-1 col-span-8">
                                <Label>Description</Label>
                                <Input placeholder="Storage Charge" value={item.label} onChange={(e) => updateItem(index, "label", e.target.value,)} />
                            </div>

                            <div className="space-y-1 col-span-3">
                                <Label>Amount</Label>
                                <Input type="number" min={0} step="0.01" placeholder="0.00" value={item.amount === 0 ? "" : item.amount}
                                    onChange={(e) => updateItem(index, "amount", e.target.value)} />
                            </div>

                            <div className="col-span-1">
                                <Button type="button" variant="outline" onClick={() => removeItem(index)} className="w-full hover:text-destructive">
                                    <CloseSquare className="size-4 md:size-4.5 xl:size-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4 border-border border-t">
                <div className="text-right">
                    <p className="font-mono text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">
                        Total Amount
                    </p>
                    <p className="font-display font-bold text-gold text-xl md:text-2xl xl:text-3xl">
                        {total.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}